import Fileuploader from '@/components/comp-544'
import { Container} from '@/components/container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function page() {
  return (
    <div>
        <Container className='flex max-w-screen items-center justify-center h-40 font-bold text-4xl  text-amber-600 hover:text-amber-700 flex-col'>
          Welcome to FoodVision
          <p className='text-lg text-amber-400'>A website where you can identify your food by uploading your photos</p>
        </Container>
        <div className='flex max-w-screen items-center justify-center'>
        <Card className='flex w-4xl'>
          <CardHeader>
            <CardTitle>
              Title
            </CardTitle>
          </CardHeader>
          <Separator/>
          <CardContent>
            <div className="flex h-5 items-center text-sm justify-around">
            <Fileuploader/>
            <Separator orientation='vertical' className='flex w-max'/>
            <div>Conetent 2</div>
            </div>
          </CardContent>
        </Card>
        </div>
    </div>
  )
}

export default page
