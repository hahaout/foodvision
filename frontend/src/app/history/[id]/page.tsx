import { api } from '@/trpc/server'
import { useRouter } from 'next/router'
import React from 'react'

interface PageProps {
  params: { id: string }; // Next.js automatically injects params
}

async function page({params}:PageProps) {

    const data = await api.AgentRouter.getDetail({id:parseInt(params.id)})
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Prediction Details</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Metadata</h2>
        <div className="space-y-2">
          <p><span className="font-medium">ID:</span> {data.meta_data.id}</p>
          <p><span className="font-medium">Date:</span> {new Date(data.meta_data.date).toLocaleString()}</p>
          <p><span className="font-medium">Model:</span> {data.meta_data.model}</p>
          <p><span className="font-medium">Status:</span> {data.detailed_predictions[0].probability >= 0.5 ? "Success" : "Failed"}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Predictions</h2>
        <div className="space-y-4">
          {data.detailed_predictions.map((prediction, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium capitalize">{prediction.food}</span>
                <span className="text-blue-600">{(prediction.probability * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${prediction.probability * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
