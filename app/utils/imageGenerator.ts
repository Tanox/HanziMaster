// app/utils/imageGenerator.ts v0.7.1
import { HanziData, CharacterAnalysis, AppSettings } from '../types';

interface GenerationOptions {
    hanziData: HanziData;
    analysis: CharacterAnalysis;
    settings: AppSettings;
    theme: 'light' | 'dark';
}

export const generateShareImage = (options: GenerationOptions): Promise<string> => {
    return new Promise((resolve, reject) => {
        const { analysis, theme } = options;
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No context');

        const isDark = theme === 'dark';
        ctx.fillStyle = isDark ? '#1e293b' : '#fdfbf7';
        ctx.fillRect(0, 0, 1080, 1080);

        // Simple placeholder image generation for brevity in refactor
        ctx.font = "bold 80px 'Noto Serif SC'";
        ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText(analysis.char, 540, 540);
        ctx.font = "40px sans-serif";
        ctx.fillText(analysis.pinyin, 540, 640);
        
        resolve(canvas.toDataURL('image/png'));
    });
};