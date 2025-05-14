"use client"

import React, { useEffect, useState } from 'react'
import {datafetch} from './actions'
import { FileWithPreview } from '@/hooks/use-file-upload'
import { Progress } from '@/components/ui/progress'
import { Container } from '@/components/container'

interface dataType{
    success: boolean,
    predictions: number[],
    classes: string[]
}

function FoodVisionMini({
  image_path
}:{
  image_path: Blob | null
}) {

  const [data,setData] = useState<dataType|undefined>()

  useEffect(()=>{
    datafetch(image_path).then(setData)
  },[image_path])
  return (
    <div>
      {data?.predictions.length === 0 ?
      (<div className='font-bold text-xl'>
        Please insert a image
      </div>):(
        <>
        <h1 className='flex items-start justify-start text-lg'>The Probability of each label</h1>
        <h3>if probabilty is lower than 50% please report</h3>
        </>
      )
      }
      {data?.predictions.map((prob,index)=>{
        if(index<=5){
      return(
        <div key={index} className='flex flex-col min-w-lg'>
        <p className='text-xl mt-3'>{data.classes[index]}</p>
          <Progress value={prob*100}/>
      </div>
      )}})}
    </div>
  )
}

export default FoodVisionMini
