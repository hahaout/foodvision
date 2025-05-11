
import { publicProcedure , createTRPCRouter } from '@/server/api/trpc'

interface dataType{
    success: boolean,
    predictions: number[],
    classes: string[]
}

export const Agent = createTRPCRouter({
    testing: publicProcedure.query(async()=>{
        try{
        const response = await fetch('http://localhost:8000/api/predict/');

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