
import { historyType } from '@/schemas/history';
import { FoodPredType, HistoryPostType, MetaDataType } from '@/schemas/history_post';
import { predictionsDataType } from '@/schemas/prediction';
import { publicProcedure , createTRPCRouter } from '@/server/api/trpc'
import { z } from 'zod';

export const Agent = createTRPCRouter({
    predict: publicProcedure
    .input(z.object({
        imageBlob: z.instanceof(Blob)
    }))
    .query(async({input})=>{
        try{
        
        // Create FormData and append the blob
        const formData = new FormData();
        formData.append('image', input.imageBlob, 'upload.jpg')  

        const response = await fetch('http://localhost:8000/api/predict/',{
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
          throw new Error(`Django API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Validate the response shape
        return data as predictionsDataType;}catch(error){
            throw new Error(`${error}`)
        }
    

    }),
    getAll : publicProcedure
    .query(async()=>{
        try{
            const {data: response} = await fetch('http://127.0.0.1:8000/history/',{
                method: "GET"
            }).then((response)=>(response.json()))
            //console.log(response)
            // add unit testing later to make sure the data we received is the right format
            return response as historyType[]
        }
        catch(error){
            throw new Error(`${error}`)
        }
    }),
    getDetail : publicProcedure
    .input(z.object({id: z.number()}))
    .query(async ({input})=>{

        const data = await fetch(`http://127.0.0.1:8000/history/details/${input.id}/`)
        const output = await data.json()
        
        return output as HistoryPostType
        
    }),
    save: publicProcedure
    .input(z.object({
        model: z.string(),
        predictions : z.array(z.object({
            className: z.string(),
            probability: z.number()
        })),
        imageBlob : z.instanceof(Blob)
    }))
    .mutation(async ({input})=>{
        // for image input
        const formData = new FormData
        // for data

        // since we need to add image and string so for data consistency we pass the whole thing through file
        const data = new Blob([JSON.stringify({
            "model" : input.model,
            "predictions" : input.predictions.map((item)=>({
                "food" : item.className,
                "probability" : item.probability
            }))
        })],{type : "application/json"})

        formData.append("prediction_data",data, 'data.json')
        formData.append("image", input.imageBlob, 'image.jpg')

        const {success : status} = await fetch('http://127.0.0.1:8000/history/save-data',{
            method : 'POST',
            body : formData
        }).then((response)=>(response.json()))
        console.log(status)
        return status

    }),
    deleteHistoryId: publicProcedure
    .input(z.object({
        id : z.number()
    }))
    .mutation(async ({input})=>{
        const pk = input.id  // offset back to order of array
        const response : { status: boolean} = await fetch(`http://127.0.0.1:8000/history/delete/${pk}`,{
            method: "POST"
        }

        ).then((response)=>(response.json()))

        
        console.log(response)
        
        return response
    })
},


)