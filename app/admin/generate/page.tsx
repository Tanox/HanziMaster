'use client';

import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

export default function DatabaseGenerator() {
  const [status, setStatus] = useState('Idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 50));
  };

  const startGeneration = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setStatus('Starting...');
    addLog('Initializing Gemini API...');

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      addLog('Error: API Key missing');
      setIsGenerating(false);
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    try {
      addLog('Fetching character list...');
      const listRes = await fetch('/hanzi-data/character-list.json');
      const allChars = await listRes.json();
      const targetChars = allChars.slice(0, 1000);
      
      const BATCH_SIZE = 10;
      const allResults = [];

      for (let i = 0; i < targetChars.length; i += BATCH_SIZE) {
        const batch = targetChars.slice(i, i + BATCH_SIZE);
        setStatus(`Processing batch ${i / BATCH_SIZE + 1}...`);
        addLog(`Batch: ${batch.join(', ')}`);

        const prompt = `Provide detailed linguistic data for the following Chinese characters: ${batch.join(', ')}. 
        Return a JSON array of objects with keys: char, pinyin, radical, structure, strokes_count, stroke_order (array of strings), examples (array of 3 strings).`;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  char: { type: Type.STRING },
                  pinyin: { type: Type.STRING },
                  radical: { type: Type.STRING },
                  structure: { type: Type.STRING },
                  strokes_count: { type: Type.INTEGER },
                  stroke_order: { type: Type.ARRAY, items: { type: Type.STRING } },
                  examples: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["char", "pinyin", "radical", "structure", "strokes_count", "stroke_order", "examples"]
              }
            }
          }
        });

        const text = response.text;
        if (!text) {
          addLog('Error: Empty response from Gemini');
          continue;
        }
        const batchData = JSON.parse(text);
        allResults.push(...batchData);
        setProgress(Math.round(((i + batch.length) / targetChars.length) * 100));
        
        // In a real browser, we can't write to FS, so we'll offer a download at the end
        if (i % 50 === 0) {
           addLog(`Intermediate progress: ${allResults.length} chars collected.`);
        }
      }

      setStatus('Complete!');
      addLog('Generation finished. Preparing download...');
      
      const blob = new Blob([JSON.stringify(allResults, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hanzi_master_1000.json';
      a.click();
      URL.revokeObjectURL(url);

    } catch (err: any) {
      addLog(`Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl mt-10">
      <h1 className="text-2xl font-bold mb-4">Hanzi Database Generator</h1>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span>Status: <span className="font-semibold">{status}</span></span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <button 
        onClick={startGeneration}
        disabled={isGenerating}
        className={`w-full py-3 rounded-xl font-bold text-white transition-all ${isGenerating ? 'bg-slate-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-teal-500/20'}`}
      >
        {isGenerating ? 'Generating...' : 'Start 1000 Char Generation'}
      </button>

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Logs</h2>
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg h-64 overflow-y-auto font-mono text-xs">
          {logs.map((log, i) => (
            <div key={i} className="mb-1 border-b border-slate-100 dark:border-slate-700 pb-1 last:border-0">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
