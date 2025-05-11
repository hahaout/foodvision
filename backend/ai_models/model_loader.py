import torch as T
from torch import nn
import os
from backend.settings import BASE_DIR
import torchvision

from django.db import models

import torch as T
from torch import nn
import os
from backend.settings import BASE_DIR
import torchvision

from django.db import models

def create_effnetb2_model(num_classes:int=3, 
                          seed:int=42):
    """Creates an EfficientNetB2 feature extractor model and transforms.

    Args:
        num_classes (int, optional): number of classes in the classifier head. 
            Defaults to 3.
        seed (int, optional): random seed value. Defaults to 42.

    Returns:
        model (torch.nn.Module): EffNetB2 feature extractor model. 
        transforms (torchvision.transforms): EffNetB2 image transforms.
    """
    # Create EffNetB2 pretrained weights, transforms and model
    weights = torchvision.models.EfficientNet_B2_Weights.DEFAULT
    transforms = weights.transforms()
    model = torchvision.models.efficientnet_b2(weights=weights)

    # Freeze all layers in base model
    for param in model.parameters():
        param.requires_grad = False

    # Change classifier head with random seed for reproducibility
    T.manual_seed(seed)
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3, inplace=True),
        nn.Linear(in_features=1408, out_features=num_classes),
    )
    
    return model , transforms

class EffnetB2():
    """Initialize EfficientNetB2 model with custom classifier"""
    def __init__(self, num_classes=3):
        # Create EffNetB2 model
        self.effnetb2, self.transform = create_effnetb2_model(num_classes) # len(class_names) would also work
        # Load saved weights
        self.effnetb2.load_state_dict(
            T.load(
                f=os.path.join(BASE_DIR , "ai_models/trained_models/sushi_pizza_steak.pth"),
                map_location=T.device("cpu"),  # load to CPU
            )
        )




