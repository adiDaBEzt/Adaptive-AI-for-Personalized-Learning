import requests
from crewai.tools import tool
from openai import OpenAI

@tool("Tool Name")
def dalle(question: str) -> str:
    """Tool to create a diagram or image for a Diagram based question. The input should be the prompt to generate the image"""
    client = OpenAI()

    response = client.images.generate(
        model="dall-e-3",
        prompt=question,
        size="1024x1024",
        quality="standard",
        n=1,
    )

    image_url = response.data[0].url
    # image_response = requests.get(image_url)

    # if image_response.status_code == 200:
    #     image_path = f"img.png"
    #     with open(image_path, 'wb') as f:
    #         f.write(image_response.content)
    #     return image_path
    # else:
    #     raise Exception(f"Failed to download image from {image_url}")

    return image_url