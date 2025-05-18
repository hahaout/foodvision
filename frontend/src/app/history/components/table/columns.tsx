"use client"

import { historyType } from '@/schemas/history'
import {ColumnDef} from '@tanstack/react-table'
import Link from 'next/link'
import { ArrowUp, ArrowUpDown } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<historyType>[] = [
  {
    accessorKey: "id",
    header: ({table})=>{

      return (
        <div className='flex flex-row gap-5 items-center'>
        <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        />
        <p>ID</p>
        </div >
      )
    },
    cell: ({ row }) => {
      const history_id = parseInt(row.getValue("id"))
      return(
      <div className='flex flex-row gap-5 items-center'>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
      <p>{history_id}</p>
      </div>
    )},
  },
  {
    accessorKey: "date",
    header: ({column})=>{

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='"flex items-center gap-2 hover:bg-gray-100/50 hover:border hover:border-gray-200 transition-colors"'
        >
          Prediction Time
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3 opacity-70" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUpDown className="h-3 w-3 opacity-70" />
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-70" />
          )}
        </Button>
      )
    },
  },
  {
    accessorKey: "model",
    header: "Model Agent"
  },
  {
    accessorKey: "prediction",
    header: "Highest Probability Food"
  },
  {
    accessorKey: "probability",
    header: ({column})=>{

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='"flex items-center gap-2 hover:bg-gray-100/50 hover:border hover:border-gray-200 transition-colors"'
        >
          Probability
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3 opacity-70" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUpDown className="h-3 w-3 opacity-70" />
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-70" />
          )}
        </Button>
      )
    },
    cell: ({row})=>{
      const prob = parseFloat(row.getValue("probability"))
      const percentage = (prob*100).toFixed(2)
      return <div>{percentage} %</div>
    }
  },
  {
    accessorKey: "result",
    header: "Result"
  },
  {
    id: "actions",
    header: "Links",
    cell({row}) {
      const uid = parseInt(row.getValue("id"))
      return(
        <Link
        href={`history/${uid}`}
        className='font-bold underline'
        >
        Learn More
        </Link>
      )
    },
  }
]


