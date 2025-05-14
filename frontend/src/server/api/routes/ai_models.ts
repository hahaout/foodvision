
import { publicProcedure , createTRPCRouter } from '@/server/api/trpc'
import { z } from 'zod';

interface dataType{
    success: boolean,
    predictions: number[],
    classes: string[]
}

export const Agent = createTRPCRouter({
    predict: publicProcedure
    .input(z.object({
        data: z.instanceof(FormData)
    }))
    .query(async({input})=>{
        try{
        const response = await fetch('http://localhost:8000/api/predict/',{
            method: 'POST',
            body: input.data
        });

        if (!response.ok) {
          throw new Error(`Django API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Validate the response shape
        return data as dataType;}catch(error){
            throw new Error(`${error}`)
        }
        
        
    })
})