

/**
 * HanziMaster v0.4.0
 * Image Generation Service for Sharable Content
 */
import { HanziData, CharacterAnalysis, AppSettings } from '../types';

interface GenerationOptions {
    hanziData: HanziData;
    analysis: CharacterAnalysis;
    settings: AppSettings;
    theme: 'light' | 'dark';
}

const SIZE = 1080; // Final image size
const PADDING = 80;
const VIEW_SIZE = 1024; // HanziData internal size

export const generateShareImage = (options: GenerationOptions): Promise<string> => {
    return new Promise((resolve, reject) => {
        const { hanziData, analysis, settings, theme } = options;

        const canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Could not get canvas context');

        // Fonts need to be loaded for canvas to use them
        // A simple promise that resolves when fonts are likely ready
        const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
        
        (fontsReady as Promise<any>).then(() => {
            // 1. Draw Background
            ctx.fillStyle = theme === 'dark' ? '#1e293b' : '#fdfbf7';
            ctx.fillRect(0, 0, SIZE, SIZE);

            // 2. Prepare rendering area
            const renderAreaSize = SIZE - PADDING * 2;
            ctx.save();
            ctx.translate(PADDING, PADDING);

            // 3. Draw Grid
            drawGrid(ctx, renderAreaSize, settings.gridStyle, theme);

            // 4. Draw Character (via SVG)
            drawCharacterAsImage(ctx, renderAreaSize, hanziData).then(() => {
                // 5. Draw Text
                drawText(ctx, renderAreaSize, analysis, theme);
                
                // 6. Draw Branding
                drawBranding(ctx, renderAreaSize, theme);

                ctx.restore();
                resolve(canvas.toDataURL('image/png'));
            }).catch(reject);
        }).catch(reject);
    });
};

const drawGrid = (ctx: CanvasRenderingContext2D, size: number, style: AppSettings['gridStyle'], theme: string) => {
    if (style === 'none') return;

    ctx.strokeStyle = theme === 'dark' ? '#334155' : '#e2e8f0';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, size, size); // Bounding box
    ctx.beginPath();
    ctx.moveTo(size / 2, 0); ctx.lineTo(size / 2, size); // Vertical
    ctx.moveTo(0, size / 2); ctx.lineTo(size, size / 2); // Horizontal
    if (style === 'rice') {
        ctx.moveTo(0, 0); ctx.lineTo(size, size); // Diagonal
        ctx.moveTo(size, 0); ctx.lineTo(0, size); // Diagonal
    }
    ctx.stroke();
};

const drawCharacterAsImage = (ctx: CanvasRenderingContext2D, size: number, hanziData: HanziData): Promise<void> => {
    return new Promise((resolve, reject) => {
        const OFFSET_Y = VIEW_SIZE * 0.9;
        const strokeColor = '#cf352e';

        const strokePaths = hanziData.strokes.map(stroke => 
            `<path d="${stroke}" fill="none" stroke="${strokeColor}" stroke-width="80" stroke-linecap="round" stroke-linejoin="round" />`
        ).join('');

        const svgString = `
            <svg width="${VIEW_SIZE}" height="${VIEW_SIZE}" viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0, ${OFFSET_Y}) scale(1, -1)">
                    ${strokePaths}
                </g>
            </svg>
        `;

        const img = new Image();
        img.onload = () => {
            const charPadding = size * 0.1;
            ctx.drawImage(img, charPadding, charPadding, size - charPadding * 2, size - charPadding * 2);
            resolve();
        };
        img.onerror = () => reject('Failed to load character SVG for canvas');
        img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    });
};

const drawText = (ctx: CanvasRenderingContext2D, size: number, analysis: CharacterAnalysis, theme: string) => {
    const pinyin = analysis.pinyin !== '-' ? analysis.pinyin : '';
    
    // Pinyin
    ctx.font = `bold 52px 'Inter', sans-serif`;
    ctx.fillStyle = theme === 'dark' ? '#f0aaa6' : '#e67872';
    ctx.textAlign = 'center';
    ctx.fillText(pinyin, size / 2, size + 65);
};

const drawBranding = (ctx: CanvasRenderingContext2D, size: number, theme: string) => {
    // App Title
    ctx.font = `bold 28px 'Inter', sans-serif`;
    ctx.fillStyle = theme === 'dark' ? '#475569' : '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText('HanziMaster', size / 2, size + 140);

    // Website URL
    const url = window.location.host;
    ctx.font = `medium 18px 'Inter', sans-serif`;
    ctx.fillStyle = theme === 'dark' ? '#334155' : '#cbd5e1';
    ctx.fillText(url, size / 2, size + 168);
};
