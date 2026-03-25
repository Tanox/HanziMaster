// app/hooks/useVeoVideoGenerator.ts v2.1.2
import { useState } from 'react';
import { generateStrokeVideo, getOperationStatus } from '../../services/veoService';
import { UILabels } from '../../types';

export const useVeoVideoGenerator = (char: string, labels: UILabels) => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'selecting' | 'generating' | 'ready' | 'error'>('idle');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkAndGenerate = async () => {
    try {
      setStatus('checking');
      const hasKey = await window.aistudio.hasSelectedApiKey();
      
      if (!hasKey) {
        setStatus('selecting');
        return;
      }

      startGeneration();
    } catch (err) {
      console.error("Error checking API key:", err);
      setStatus('error');
      setError(labels.videoError);
    }
  };

  const handleOpenKeySelector = async () => {
    try {
      await window.aistudio.openSelectKey();
      // Assume success as per guidelines
      startGeneration();
    } catch (err) {
      console.error("Error opening key selector:", err);
      setStatus('error');
      setError(labels.videoError);
    }
  };

  const startGeneration = async () => {
    try {
      setStatus('generating');
      setError(null);
      
      let operation = await generateStrokeVideo(char);
      
      // Polling
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await getOperationStatus(operation);
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        // Fetch with API key header
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': apiKey || '',
          },
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setVideoUrl(url);
          setStatus('ready');
        } else {
          throw new Error("Failed to fetch video content");
        }
      } else {
        throw new Error("No video URI in response");
      }
    } catch (err: any) {
      console.error("Video generation failed:", err);
      if (err.message?.includes("Requested entity was not found")) {
        setStatus('selecting');
        setError(labels.apiKeyRequired);
      } else {
        setStatus('error');
        setError(labels.videoError);
      }
    }
  };

  return {
    status,
    setStatus,
    videoUrl,
    error,
    checkAndGenerate,
    handleOpenKeySelector,
  };
};
