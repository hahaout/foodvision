
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

        const data = await fetch(`http://127.0.0.1:8000/history/${input.id}/`)
        const output = await data.json()
        
        return output as HistoryPostType
        
    })
},


)