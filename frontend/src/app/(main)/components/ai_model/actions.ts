"use server"

import { api } from "@/trpc/server"

async function test(){
    const data = await api.AgentRouter.testing()
    if (!data){
        throw new Error(`Error fetching data`)
    }
    return data
}