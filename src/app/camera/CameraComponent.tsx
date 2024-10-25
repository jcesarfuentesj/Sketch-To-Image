"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

import { Button } from "@/client/components/ui/button";
import { Card } from "@/client/components/ui/card";
import { Input } from "@/client/components/ui/input";
import { logger } from "@/init/logger";

type SketchToImageResponse = {
  image_url: string;
};

export default function CameraComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState(``);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      logger.error(`Error accessing camera:`, err);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext(`2d`);
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const imageDataUrl = canvasRef.current.toDataURL(`image/jpeg`);
        setCapturedImage(imageDataUrl);
      }
    }
  };

  const sendImage = async () => {
    if (!capturedImage || !prompt) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/sketchToImage`, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify({
          image: capturedImage,
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as SketchToImageResponse;
      setResultImage(data.image_url);
    } catch (error) {
      logger.error(`Error sending image:`, error);
      setResultImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={startCamera}>Start Camera</Button>
      <video ref={videoRef} autoPlay className="w-full max-w-md" />
      <canvas ref={canvasRef} className="hidden" width="640" height="480" />
      <Button onClick={captureImage}>Capture Image</Button>
      {capturedImage && (
        <Card className="p-4">
          <Image
            src={capturedImage}
            alt="Captured"
            width={640}
            height={480}
            className="w-full max-w-md"
          />
          <Input
            type="text"
            placeholder="Enter prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-2"
          />
          <Button onClick={sendImage} disabled={isLoading} className="mt-2">
            {isLoading ? `Processing...` : `Send to API`}
          </Button>
        </Card>
      )}
      {resultImage && (
        <Card className="p-4">
          <h2 className="mb-2 text-xl font-semibold">Result</h2>
          <Image
            src={resultImage}
            alt="Result"
            width={640}
            height={480}
            className="w-full max-w-md"
          />
        </Card>
      )}
    </div>
  );
}
