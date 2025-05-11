from ai_models.model_loader import EffnetB2
import torch
import numpy as np

class_names = ["pizza", "steak", "sushi"]

class Predictor:
    @staticmethod
    def predict(input_data):
        """Convert input to tensor and get prediction"""
        with torch.inference_mode():
        # Pass the transformed image through the model and turn the prediction logits into prediction probabilities
            pred_probs = torch.softmax(EffnetB2(input_data), dim=1)
    
        # Create a prediction label and prediction probability dictionary for each prediction class (this is the required format for Gradio's output parameter)
        pred_labels_and_probs = {class_names[i]: float(pred_probs[0][i]) for i in range(len(class_names))}
        
        # Return the prediction dictionary and prediction time 
        return pred_labels_and_probs