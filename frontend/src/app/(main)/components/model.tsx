"use client"

import Fileuploader from '@/components/comp-544'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React, { useCallback, useState } from 'react'
import { ModelSelector } from './model_selector'
import FoodVisionMini from './ai_model/FoodVisionMini'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { saveHistory } from './ai_model/actions'


interface PredictionData {
  className: string
  probability: number
}

interface SavedDataType {
  data: PredictionData[]
  model: string
  image: Blob
}

function Model() {
  const [model, setModel] = useState<string>("")
  const [foodImg, setFoodImg] = useState<Blob | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const saveData = useCallback(async () => {
    const data = sessionStorage.getItem("predictions")
    
    if (!data || !data.trim()) {
      toast.error("No prediction data found", { id: "save-data" })
      return
    }
    
    if (model.length === 0) {
      toast.error("Please select a model first", { id: "save-data" })
      return
    }
    
    if (!foodImg) {
      toast.error("Please upload an image first", { id: "save-data" })
      return
    }

    try {
      setIsSaving(true)
      toast.loading("Saving data...", { id: "save-data" })
      
      const prediction = sessionStorage.getItem("predictions")
      if (prediction == null){
        return Error("failed to get prediction")
      }
      const data : PredictionData[] = JSON.parse(prediction)
      // mutate to save data
      const {success} = await saveHistory({ model : model,predictions :data , image: foodImg})
      
      toast.success("Data saved successfully!", { id: "save-data" })
    } catch (error) {
      console.error("Failed to save data:", error)
      toast.error("Failed to save data", { id: "save-data" })
    } finally {
      setIsSaving(false)
    }
  }, [model, foodImg])

  const resetForm = useCallback(() => {
    setModel("")
    setFoodImg(null)
    sessionStorage.removeItem("predictions")
    toast.success("Form has been reset")
  }, [])

  return (
    <Card className='w-full max-w-4xl'>
      <CardHeader>
        <CardTitle>
          <ModelSelector setModel={setModel} model={model} />
        </CardTitle>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="p-6">
        <div className="flex h-fit items-center justify-around gap-4">
          <Fileuploader 
            img_selector={setFoodImg} 
            img={foodImg} 
          />
          <Separator orientation='vertical' className="h-auto" />
          {renderModelComponent(model, foodImg)}
        </div>
      </CardContent>
      
      <CardFooter className='flex justify-end gap-4'>
        <Button
          onClick={saveData}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
        <Button
          onClick={resetForm}
          variant="outline"
        >
          Reset
        </Button>
      </CardFooter>
    </Card>
  )
}

function renderModelComponent(modelName: string, file: Blob | null) {
  switch(modelName) {
    case "Pizza-Steak-Sushi":
      return <FoodVisionMini image_path={file} />
    default:
      return (
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">
            {modelName ? "Model not found" : "Please select a model"}
          </p>
        </div>
      )
  }
}

export { Model }