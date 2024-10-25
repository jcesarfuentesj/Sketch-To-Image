import { NextResponse } from "next/server";
import Replicate from "replicate";

import { env } from "@/env.js";

const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN,
});

type RequestData = {
  image: string;
  prompt: string;
};

type ResponseData = {
  image_url?: string;
  error?: string;
};

export async function POST(
  request: Request
): Promise<NextResponse<ResponseData>> {
  const { image, prompt } = (await request.json()) as RequestData;

  if (!image || !prompt) {
    return NextResponse.json(
      { error: `Image and prompt are required` },
      { status: 400 }
    );
  }

  try {
    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image.split(`,`)[1] || ``, `base64`);

    // Call the Replicate API to transform the sketch
    const output = (await replicate.run(
      `stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc`,
      {
        input: {
          width: 768,
          height: 768,
          prompt: `A realistic ${prompt} matching the size and proportions of the original sketch. Maintain lifelike textures and subtle fur details.`,
          negative_prompt: `oversized, full-canvas, distorted proportions, cartoon`,
          scheduler: `DDIM`,
          num_outputs: 1,
          guidance_scale: 7.5,
          apply_watermark: false,
          prompt_strength: 0.6,
          num_inference_steps: 70,
          adapter_conditioning_scale: 0.8,
          image: imageBuffer,
        },
      }
    )) as string[];

    // Return the generated image URL
    const imageUrl = String(output[0]);
    return NextResponse.json({ image_url: imageUrl });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : `Unknown error occurred`;
    return NextResponse.json(
      { error: `Model execution failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
