from crewai.tools import tool
from openai import OpenAI

@tool("Tool Name")
def dalle(question: dict) -> str:
    """Tool to create a diagram or image for a Diagram based question. The input should be a dictionary with a 'question' key containing a 'description'."""
    prompt = question["question"]["description"]

    client = OpenAI()
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    image_url = response.data[0].url
    return image_url