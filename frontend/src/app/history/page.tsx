import React, { useCallback } from 'react'
import { DataTable } from './components/table/data-table'
import { api } from '@/trpc/server'
import { columns } from './components/table/columns'

async function page() {
    const data = await api.AgentRouter.getAll()
  return (
    <div>
      <h1 className='text-4xl'>History</h1>
      <DataTable columns={columns} data={data}/>
    </div>
  )
}

export default page

