import boto3
import json
from datetime import datetime

# Create a Bedrock Runtime client
client = boto3.client("bedrock-runtime", region_name="us-east-2")

# Model ID for Nova Lite (ensure you have provisioned access)
LITE_MODEL_ID = "us.amazon.nova-lite-v1:0"

# Define system behavior
system_list = [
    {
        "text": "You are a helpful assistant."
    }
]

# Inference parameters
inf_params = {
    "maxTokens": 500,
    "topP": 0.9,
    "topK": 20,
    "temperature": 0.7
}

# Chat history initialization
chat_history = []

print("Chatbot is ready! Type 'exit' to quit.\n")

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break

    # Add user message to history
    chat_history.append({
        "role": "user",
        "content": [{"text": user_input}]
    })

    # Construct request
    request_body = {
        "schemaVersion": "messages-v1",
        "system": system_list,
        "messages": chat_history,
        "inferenceConfig": inf_params
    }

    start_time = datetime.now()

    try:
        response = client.invoke_model_with_response_stream(
            modelId=LITE_MODEL_ID,
            body=json.dumps(request_body)
        )
    except Exception as e:
        print(f"Error: {e}")
        continue

    request_id = response.get("ResponseMetadata", {}).get("RequestId", "N/A")
    print(f"(Request ID: {request_id})")
    print("Bot:", end=" ")

    # Handle streamed output
    stream = response.get("body")
    chunk_count = 0
    time_to_first_token = None
    bot_reply = ""

    if stream:
        for event in stream:
            chunk = event.get("chunk")
            if chunk:
                chunk_json = json.loads(chunk.get("bytes").decode())
                content_block_delta = chunk_json.get("contentBlockDelta")
                if content_block_delta:
                    if time_to_first_token is None:
                        time_to_first_token = datetime.now() - start_time
                    chunk_count += 1
                    text_piece = content_block_delta.get("delta", {}).get("text", "")
                    bot_reply += text_piece
                    print(text_piece, end="")
        print("\n")

        # Add bot reply to chat history
        chat_history.append({
            "role": "assistant",
            "content": [{"text": bot_reply}]
        })
    else:
        print("No response stream received.\n")
