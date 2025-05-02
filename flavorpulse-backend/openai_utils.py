from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()  # This loads variables from .env into the environment


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_text(data) -> str:
    if isinstance(data, str):
        prompt = data
        model = "gpt-4"
    elif isinstance(data, dict):
        prompt = data.get("prompt")
        model = data.get("model", "gpt-4")
    else:
        raise ValueError("generate_text expects a string or a dict with 'prompt' and optional 'model'.")

    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=500
    )
    return response.choices[0].message.content.strip()
