
// app/services/veoService.ts v1.0.0
import { GoogleGenAI } from "@google/genai";

export const generateStrokeVideo = async (char: string, aesthetic: string = "Paper & Ink") => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY is missing");
  
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `A short video demonstrating the stroke order of the Chinese character "${char}". 
  The aesthetic should be "${aesthetic}", featuring a traditional brush writing on textured rice paper with deep black ink. 
  The camera should be a top-down view, showing the fluid motion of the brush as it completes each stroke in the correct order. 
  The lighting should be soft and natural, emphasizing the texture of the paper and the subtle variations in the ink's opacity.`;

  let operation = await (ai.models as any).generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  });

  return operation;
};

export const getOperationStatus = async (operation: any) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY is missing");
  const ai = new GoogleGenAI({ apiKey });
  return await (ai as any).operations.getVideosOperation({ operation });
};
