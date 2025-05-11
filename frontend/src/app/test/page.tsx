import { api } from '@/trpc/server'
import React from 'react'

async function page() {
    const data = await api.AgentRouter.testing()
    if (!data){
        throw new Error("data is broken")
    }
  return (
    <div>
      {data.predictions.map((prob,index)=>(
        <li key={index}>
            {prob}
      </li>))}
    </div>
  )
}

export default page
