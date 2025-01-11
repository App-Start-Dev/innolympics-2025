import os 
from openai import OpenAI
from flask import Blueprint, request, jsonify

client  = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

ai_blueprint = Blueprint('ai', __name__)

def chat_completion(prompt):
    chat_completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=100,
        temperature=0.5
    )
    return chat_completion.choices[0].message.content

@ai_blueprint.route('/generate', methods=['POST'])
def generate():
    prompt = request.json['prompt']
    response = chat_completion(prompt)

    return jsonify({'data': response}), 200


