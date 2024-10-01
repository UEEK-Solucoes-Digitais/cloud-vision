import torch
from torchvision import models, transforms
from PIL import Image
import json
import sys
import cv2
import numpy as np
from sklearn.cluster import KMeans
from torchvision import models
from torchvision.models import ResNet50_Weights


def load_labels(imagenet_path):
    with open(imagenet_path) as f:
        return json.load(f)


def get_dominant_colors(image_path, num_colors=3):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = image.reshape((image.shape[0] * image.shape[1], 3))

    kmeans = KMeans(n_clusters=num_colors)
    kmeans.fit(image)

    colors = kmeans.cluster_centers_
    colors = np.array(colors, dtype="uint8")

    return colors


def predict(image_path, imagenet_path):
    # print("Image path received:", image_path)  # Debugging
    # Carregar o modelo ResNet-50 pré-treinado com pesos atualizados
    model = models.resnet50(weights=ResNet50_Weights.DEFAULT)
    model.eval()

    preprocess = transforms.Compose(
        [
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )

    try:
        img = Image.open(image_path)
    except Exception as e:
        print("Error opening image:", e)
        return []

    img_t = preprocess(img)
    batch_t = torch.unsqueeze(img_t, 0)

    try:
        with torch.no_grad():
            out = model(batch_t)
    except Exception as e:
        print("Error during prediction:", e)
        return []

    labels = load_labels(imagenet_path)

    _, indices = torch.sort(out, descending=True)
    top5_indices = indices[0][:5]

    predictions = [labels[idx.item()] for idx in top5_indices]

    # Detectando cores dominantes
    dominant_colors = get_dominant_colors(image_path)

    return {"predictions": predictions, "dominant_colors": dominant_colors.tolist()}


if __name__ == "__main__":
    image_path = sys.argv[1]
    imagenet_path = sys.argv[2]
    result = predict(image_path, imagenet_path)
    output = {
        "predictions": result["predictions"],
        "dominant_colors": result["dominant_colors"],
    }
    print(json.dumps(output))
    # print("Predicted labels:", result["predictions"])
    # print("Dominant colors (RGB):", result["dominant_colors"])
