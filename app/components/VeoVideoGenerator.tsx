
// app/components/VeoVideoGenerator.tsx v1.3.4
'use client';

import React, { useState, useEffect } from 'react';
import { Video, Loader2, Play, AlertCircle, Key, ExternalLink } from 'lucide-react';
import { generateStrokeVideo, getOperationStatus } from '../services/veoService';
import { UILabels } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface VeoVideoGeneratorProps {
  char: string;
  labels: UILabels;
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function VeoVideoGenerator({ char, labels }: VeoVideoGeneratorProps) {
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

  return (
    <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
          <Video size={18} className="text-teal-500" />
          <span>{labels.generateVideo}</span>
        </div>
        {status === 'generating' && (
          <div className="flex items-center gap-2 text-xs text-teal-500 font-medium animate-pulse">
            <Loader2 size={14} className="animate-spin" />
            <span>{labels.videoGenerating}</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.button
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={checkAndGenerate}
            className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Play size={18} fill="currentColor" />
            {labels.generateVideo}
          </motion.button>
        )}

        {status === 'selecting' && (
          <motion.div
            key="selecting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-xl text-sm flex gap-3 border border-amber-100 dark:border-amber-900/30">
              <AlertCircle size={18} className="shrink-0" />
              <p>{labels.apiKeyRequired}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleOpenKeySelector}
                className="w-full py-3 px-4 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Key size={18} />
                {labels.selectApiKey}
              </button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-center text-slate-500 hover:text-teal-500 flex items-center justify-center gap-1 transition-colors"
              >
                {labels.settingApiKeyHelp} <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        )}

        {status === 'generating' && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="aspect-video bg-slate-50 dark:bg-slate-900/50 rounded-xl flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-200 dark:border-slate-700"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
              <Video className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-500" size={24} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium px-6 text-center">
              {labels.videoGenerating}
            </p>
          </motion.div>
        )}

        {status === 'ready' && videoUrl && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                {labels.videoReady}
              </span>
              <button 
                onClick={() => setStatus('idle')}
                className="text-xs text-slate-500 hover:text-teal-500 transition-colors"
              >
                {labels.controlsReset}
              </button>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-center"
          >
            <AlertCircle size={32} className="mx-auto text-red-500 mb-2" />
            <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-3">{error || labels.videoError}</p>
            <button
              onClick={() => setStatus('idle')}
              className="px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors"
            >
              {labels.controlsReset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
