import { z } from "zod";


export const history = z.object({
    id : z.number(),
    date : z.date(),
    model : z.string(),
    prediction : z.string(),
    probrability : z.number(),
    result: z.string()
})

export type historyType = z.infer<typeof history>