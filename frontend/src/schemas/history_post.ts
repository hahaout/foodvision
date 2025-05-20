import { z } from "zod";

export const FoodPred = z.object({
    food : z.string(),
    probability: z.number()
})

export type FoodPredType = z.infer<typeof FoodPred>

export const MetaData = z.object({
    id: z.number(),
    date: z.date(),
    model: z.string(),
    image: z.string()
})

export type MetaDataType = z.infer<typeof MetaData>

export type HistoryPostType = {
    meta_data: MetaDataType
    detailed_predictions: FoodPredType[]
}