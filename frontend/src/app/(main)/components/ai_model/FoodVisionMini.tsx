"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { datafetch } from './actions'
import { Progress } from '@/components/ui/progress'

interface dataType {
    success: boolean,
    predictions: number[],
    classes: string[]
}

interface Prediction {
    className: string
    probability: number
}

function FoodVisionMini({
  image_path
}: {
  image_path: Blob | null
}) {
  const [data, setData] = useState<dataType | undefined>()

  // Calculate and memoize top predictions
  const topPredictions = useMemo<Prediction[]>(() => {
    if (!data) return []
    
    return data.classes
      .map((className, index) => ({
        className,
        probability: data.predictions[index]
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 5)
  }, [data])

  // Store predictions in sessionStorage when data changes
  useEffect(() => {
    if (topPredictions.length > 0) {
      sessionStorage.setItem("predictions", JSON.stringify(topPredictions))
    }
  }, [topPredictions])

  // Fetch data when image changes
  useEffect(() => {
    if (image_path) {
      datafetch(image_path).then(setData)
    } else {
      setData(undefined)
    }
    // Clear previous predictions
    sessionStorage.removeItem("predictions")
  }, [image_path])

  return (
    <div>
      {!data || data.predictions.length === 0 ? (
        <div className='font-bold text-xl'>
          Please insert an image
        </div>
      ) : (
        <>
          <h1 className='flex items-start justify-start text-lg'>
            The Probability of each label
          </h1>
          <h3>If probability is lower than 50% please report</h3>
          
          {topPredictions.map((prediction, index) => (
            <div key={index} className='flex flex-col min-w-lg'>
              <p className='text-xl mt-3'>{prediction.className}</p>
              <Progress value={prediction.probability * 100} />
              <p className='text-sm text-gray-500'>
                {(prediction.probability * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default FoodVisionMini