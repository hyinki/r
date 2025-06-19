# # Generate and print an embedding with Amazon Titan Text Embeddings V2.

# import boto3
# import json

# # Create a Bedrock Runtime client in the AWS Region of your choice.
# client = boto3.client("bedrock-runtime", region_name="us-east-2")

# # Set the model ID, e.g., Titan Text Embeddings V2.
# model_id = "amazon.nova-pro-v1:0"

# # The text to convert to an embedding.
# input_text = "Please recommend books with a theme similar to the movie 'Inception'."

# # Create the request for the model.
# native_request = {"inputText": input_text}

# # Convert the native request to JSON.
# request = json.dumps(native_request)

# # Invoke the model with the request.
# response = client.invoke_model(modelId=model_id, body=request)

# # Decode the model's native response body.
# model_response = json.loads(response["body"].read())

# # Extract and print the generated embedding and the input text token count.
# embedding = model_response["embedding"]
# input_token_count = model_response["inputTextTokenCount"]

# print("\nYour input:")
# print(input_text)
# print(f"Number of input tokens: {input_token_count}")
# print(f"Size of the generated embedding: {len(embedding)}")
# print("Embedding:")
# print(embedding)

# import boto3
# import json
# import pprint

# client = boto3.client(service_name='bedrock-runtime', region_name="us-east-2")

# titan_model_id = 'amazon.nova-pro-v1:0'

# titan_config = json.dumps({
#             "inputText": "Tell me a story about a dragon",
#             "textGenerationConfig": {
#                 "maxTokenCount": 4096,
#                 "stopSequences": [],
#                 "temperature": 0,
#                 "topP": 1
#             }
#         })

# response = client.invoke_model(
#     body=titan_config,
#     modelId=titan_model_id,
#     accept="application/json",
#     contentType="application/json"
# )

# response_body = json.loads(response.get('body').read())

# pp = pprint.PrettyPrinter(depth=4)
# pp.pprint(response_body.get('results')) # titan config

# import boto3
# import json

# from botocore.exceptions import ClientError

# # Create a Bedrock Runtime client in the AWS Region of your choice.
# client = boto3.client("bedrock-runtime", region_name="us-east-2")

# # Set the model ID, e.g., Titan Text Premier.
# model_id = "amazon.titan-embed-text-v2:0"

# # Define the prompt for the model.
# prompt = "Describe the purpose of a 'hello world' program in one line."

# # Format the request payload using the model's native structure.
# native_request = {
#     "inputText": prompt
    
    
# }

# # Convert the native request to JSON.
# request = json.dumps(native_request)

# try:
#     # Invoke the model with the request.
#     response = client.invoke_model(modelId=model_id, body=request)

# except (ClientError, Exception) as e:
#     print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
#     exit(1)

# # Decode the response body.
# model_response = json.loads(response["body"].read())

# print(model_response)

# # Extract and print the response text.
# # response_text = model_response["results"]["outputText"]
# # print(response_text)

# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0


# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0

# Use the Conversation API to send a text message to Amazon Nova.

import boto3
import json
from datetime import datetime

# Create a Bedrock Runtime client
client = boto3.client("bedrock-runtime", region_name="us-east-2")

# Model ID for Nova Lite
LITE_MODEL_ID = "us.amazon.nova-lite-v1:0"  # You might need to verify this is correct — typical format is "amazon.nova-lite-v1:0"

# Define your system prompt(s)
system_list = [
    {
        "text": "What is the tallest mountain"
    }
]

# Define message(s)
message_list = [
    {
        "role": "user",
        "content": [{"text": "Researching"}]
    }
]

# Inference parameters
inf_params = {
    "maxTokens": 500,
    "topP": 0.9,
    "topK": 20,
    "temperature": 0.7
}

# Prepare request body
request_body = {
    "schemaVersion": "messages-v1",
    "system": system_list,
    "messages": message_list,
    "inferenceConfig": inf_params
}

start_time = datetime.now()

# Invoke the model with streaming response
response = client.invoke_model_with_response_stream(
    modelId=LITE_MODEL_ID,
    body=json.dumps(request_body)
)

request_id = response.get("ResponseMetadata", {}).get("RequestId", "N/A")
print(f"Request ID: {request_id}")
print("Awaiting first token...")

chunk_count = 0
time_to_first_token = None

# Process the streamed output
stream = response.get("body")
if stream:
    for event in stream:
        chunk = event.get("chunk")
        if chunk:
            chunk_json = json.loads(chunk.get("bytes").decode())
            content_block_delta = chunk_json.get("contentBlockDelta")
            if content_block_delta:
                if time_to_first_token is None:
                    time_to_first_token = datetime.now() - start_time
                    print(f"Time to first token: {time_to_first_token}")
                chunk_count += 1
                print(content_block_delta.get("delta", {}).get("text", ""), end="")
    print(f"\n\nTotal chunks: {chunk_count}")
else:
    print("No response stream received.")
