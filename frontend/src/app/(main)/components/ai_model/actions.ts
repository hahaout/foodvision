"use server"

import { predictionsDataType } from "@/schemas/prediction";
import { api } from "@/trpc/server"

const empty : predictionsDataType = {
    success: false,
    predictions: [],
    classes: []
}

async function datafetch(imageBlob: Blob | null) {
    if (!imageBlob) {
        return empty;
    }

    try {
        // Create FormData and append the blob
        const formData = new FormData();
        formData.append('image', imageBlob, 'upload.jpg'); // Provide a filename

        // Call TRPC endpoint with FormData
        const result = await api.AgentRouter.predict({ data: formData });
        
        if (!result) {
            throw new Error("No data returned from prediction endpoint");
        }
        
        return result;
    } catch (error) {
        console.error("Image processing failed:", error);
        throw new Error(
            error instanceof Error 
                ? error.message 
                : "Failed to process image"
        );
    }
}

export { datafetch };