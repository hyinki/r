# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0
"""
Generate an image from a text prompt with the Amazon Nova Canvas model (on-demand).
"""

import base64
import io
import json
import logging
from typing import Any, Dict

import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from PIL import Image


class ImageError(Exception):
    """Raised when Amazon Nova Canvas returns an error."""

    def __init__(self, message: str) -> None:
        super().__init__(message)
        self.message = message


# --------------------------------------------------------------------------- #
# Bedrock helper                                                              #
# --------------------------------------------------------------------------- #

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")


def generate_image(model_id: str, body: str) -> bytes:
    """
    Generate an image using the Amazon Nova Canvas model.

    Parameters
    ----------
    model_id : str
        The model ID to invoke.
    body : str
        The JSON request body.

    Returns
    -------
    bytes
        Raw bytes of the generated image.

    Raises
    ------
    ImageError
        If the model returns an error payload.
    """
    logger.info("Generating image with model %s …", model_id)

    bedrock = boto3.client(
        service_name="bedrock-runtime",
        config=Config(read_timeout=300)  # 5 min timeout for large images
    )

    response = bedrock.invoke_model(
        body=body,
        modelId=model_id,
        accept="application/json",
        contentType="application/json"
    )

    response_body: Dict[str, Any] = json.loads(response["body"].read())

    # Extract the first (and only) image in Base64
    base64_image: str = response_body["images"][0]
    image_bytes = base64.b64decode(base64_image.encode("ascii"))

    # Check for error message from the service
    error_message = response_body.get("errorMessage")
    if error_message:
        raise ImageError(f"Image generation failed: {error_message}")

    logger.info("Image successfully generated with model %s", model_id)
    return image_bytes


# --------------------------------------------------------------------------- #
# Script entrypoint                                                           #
# --------------------------------------------------------------------------- #

def main() -> None:
    """Entrypoint for the Nova Canvas example."""
    model_id = "us.amazon.nova-canvas-v1:0"
    prompt = "A photograph of a cup of coffee from the side."

    request_body = json.dumps({
        "taskType": "TEXT_IMAGE",
        "textToImageParams": {"text": prompt},
        "imageGenerationConfig": {
            "numberOfImages": 1,
            "height": 1024,
            "width": 1024,
            "cfgScale": 8.0,
            "seed": 0
        }
    })

    try:
        img_bytes = generate_image(model_id=model_id, body=request_body)
        Image.open(io.BytesIO(img_bytes)).show()

    except ClientError as err:
        message = err.response["Error"]["Message"]
        logger.error("AWS client error: %s", message)
        print(f"A client error occurred: {message}")

    except ImageError as err:
        logger.error(err.message)
        print(err.message)

    else:
        print(f"Finished generating image with model {model_id}.")


if __name__ == "__main__":
    main()
