import { z } from "zod"

interface dataType{
    success: boolean,
    predictions: number[],
    classes: string[]
}

export const predictionsData = z.object({
    success: z.boolean(),
    predictions: z.array(z.number()),
    classes: z.array(z.string())
})

export type predictionsDataType = z.infer<typeof predictionsData>
