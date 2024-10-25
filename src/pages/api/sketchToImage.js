import { promises as fs } from 'fs';
import path from 'path';
import FormData from 'form-data';
import Replicate from 'replicate';

// Initialize Replicate with the API token from environment variables
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!req.files || !req.files.image || !prompt) {
    return res.status(400).json({ error: 'Image and prompt are required' });
  }

  const image = req.files.image;
  const tempPath = path.join(process.cwd(), 'tmp', image.name);

  // Save the uploaded image temporarily
  await fs.writeFile(tempPath, image.data);

  try {
    // Call the Replicate API to transform the sketch
    const output = await replicate.run(
      'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc',
      {
        input: {
          width: 768, // Example dimensions, you can modify this
          height: 768,
          prompt: `A realistic ${prompt} matching the size and proportions of the original sketch. Maintain lifelike textures and subtle fur details.`,
          negative_prompt: 'oversized, full-canvas, distorted proportions, cartoon',
          scheduler: 'DDIM',
          num_outputs: 1,
          guidance_scale: 7.5,
          apply_watermark: false,
          prompt_strength: 0.6,
          num_inference_steps: 70,
          adapter_conditioning_scale: 0.8,
          image: fs.createReadStream(tempPath),
        },
      }
    );

    // Return the generated image URL
    const imageUrl = String(output[0]);
    res.status(200).json({ image_url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: `Model execution failed: ${error.message}` });
  } finally {
    // Clean up the temporary file
    await fs.unlink(tempPath);
  }
}
