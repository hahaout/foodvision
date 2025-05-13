"use client"

import Fileuploader from '@/components/comp-544'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { ModelSelector } from './model_selector'
import FoodVisionMini from './ai_model/FoodVisionMini'

function Model() {

    const [model, setModel] = useState<string>("")
    const [food_img, setFood_img] = useState<string | null>("")
  return (
    <>
    <Card className='flex w-4xl'>
              <CardHeader>
                <CardTitle>
                  <ModelSelector setModel={setModel}/>
                </CardTitle>
              </CardHeader>
              <Separator/>
              <CardContent>
                <div className="flex h-fit items-center text-sm justify-around ">
            <Fileuploader img_selector={setFood_img}/>
            <Separator orientation='vertical'/>
            {model_switch(model, food_img ?? "")}
            {food_img? food_img: "no"}
                </div>
              </CardContent>
            </Card>
    
    </>
  )
}

export {Model}


function model_switch(model_name:string, image_path: string){
    switch(model_name){
        case "Pizza-Steak-Sushi":
            return <FoodVisionMini image_path={image_path}/>
        default:
            return (<p>No such model</p>)
    }
}

