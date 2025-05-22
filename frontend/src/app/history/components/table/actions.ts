"use server"
import { api } from "@/trpc/server"


function deleteId({
  toDel_id
}:{
  toDel_id : number[]
}){
  console.log(toDel_id)
  try{
        
        
          toDel_id.map(async (id)=>{
            const status = await api.AgentRouter.deleteHistoryId({id: id})
            console.log(status)
          })
      }
      catch(error){
        console.log(error)
      }
}


async function getTableData(){
  try{
    const data = await api.AgentRouter.getAll()
    return data
  }
  catch(error){
    console.log(error)
  }
}

export { deleteId, getTableData}