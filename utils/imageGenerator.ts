
/**
 * HanziMaster v0.4.9
 * Image Generation Service for Sharable Content
 */
import { HanziData, CharacterAnalysis, AppSettings } from '../types';

interface GenerationOptions {
    hanziData: HanziData;
    analysis: CharacterAnalysis;
    settings: AppSettings;
    theme: 'light' | 'dark';
}

const CANVAS_SIZE = 1080;
const VIEW_SIZE = 1024; // HanziData internal size

export const generateShareImage = (options: GenerationOptions): Promise<string> => {
    return new Promise((resolve, reject) => {
        const { hanziData, analysis, settings, theme } = options;

        const canvas = document.createElement('canvas');
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Could not get canvas context');

        const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
        
        fontsReady.then(() => {
            // --- Colors ---
            const isDark = theme === 'dark';
            const bgColor = isDark ? '#1e293b' : '#fdfbf7'; // Slate 900 / Paper
            const fgColor = isDark ? '#f8fafc' : '#0f172a'; // Slate 50 / Slate 900
            const accentColor = isDark ? '#f0aaa6' : '#cf352e'; // Vermilion 300 / 500
            const gridColor = isDark ? '#334155' : '#e2e8f0'; // Slate 700 / 200

            // 1. Fill Background
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

            // 2. Draw Decorative Border
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 2;
            const borderPadding = 40;
            ctx.strokeRect(borderPadding, borderPadding, CANVAS_SIZE - borderPadding * 2, CANVAS_SIZE - borderPadding * 2);

            // --- Layout ---
            const CENTER_X = CANVAS_SIZE / 2;
            const GRID_SIZE = 600;
            const GRID_X = (CANVAS_SIZE - GRID_SIZE) / 2;
            const GRID_Y = 240;

            // 3. Pinyin (Header)
            const pinyin = analysis.pinyin || '';
            ctx.font = `bold 100px 'Noto Serif SC', serif`;
            ctx.fillStyle = accentColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 10;
            ctx.fillText(pinyin, CENTER_X, 140);
            ctx.shadowBlur = 0; // Reset shadow

            // 4. Grid & Character
            ctx.save();
            ctx.translate(GRID_X, GRID_Y);

            // Draw Grid
            if (settings.gridStyle !== 'none') {
                ctx.strokeStyle = gridColor;
                ctx.lineWidth = 4;
                ctx.beginPath();
                // Outer box
                ctx.rect(0, 0, GRID_SIZE, GRID_SIZE);
                // Cross lines
                ctx.moveTo(GRID_SIZE / 2, 0); ctx.lineTo(GRID_SIZE / 2, GRID_SIZE);
                ctx.moveTo(0, GRID_SIZE / 2); ctx.lineTo(GRID_SIZE, GRID_SIZE / 2);
                // Rice diagonals
                if (settings.gridStyle === 'rice') {
                    ctx.moveTo(0, 0); ctx.lineTo(GRID_SIZE, GRID_SIZE);
                    ctx.moveTo(GRID_SIZE, 0); ctx.lineTo(0, GRID_SIZE);
                }
                ctx.stroke();
            }

            // Draw Character (Async)
            drawCharacterSVG(ctx, GRID_SIZE, hanziData, isDark ? '#ffffff' : '#0f172a').then(() => {
                ctx.restore();

                // 5. Meaning (Content)
                ctx.font = `500 42px 'Inter', sans-serif`;
                ctx.fillStyle = fgColor;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                
                // Wrap text for meaning
                const meaningY = GRID_Y + GRID_SIZE + 60;
                const maxTextWidth = CANVAS_SIZE - 160;
                wrapText(ctx, analysis.meaning, CENTER_X, meaningY, maxTextWidth, 60);

                // 6. Footer (Branding)
                const footerY = CANVAS_SIZE - 50;
                ctx.font = `bold 24px 'Inter', sans-serif`;
                ctx.fillStyle = isDark ? '#64748b' : '#94a3b8'; // Slate 500 / 400
                ctx.textBaseline = 'bottom';
                ctx.fillText(`HanziMaster • ${window.location.host}`, CENTER_X, footerY);

                resolve(canvas.toDataURL('image/png'));
            }).catch(reject);

        }).catch(reject);
    });
};

const drawCharacterSVG = (ctx: CanvasRenderingContext2D, size: number, hanziData: HanziData, color: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const OFFSET_Y = VIEW_SIZE * 0.9;
        
        // HanziWriter strokes are outlines, so we fill them to get the solid brush look
        const paths = hanziData.strokes.map(d => 
            `<path d="${d}" fill="${color}" />`
        ).join('');

        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${VIEW_SIZE}" height="${VIEW_SIZE}" viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}">
                <g transform="translate(0, ${OFFSET_Y}) scale(1, -1)">
                    ${paths}
                </g>
            </svg>
        `;

        const img = new Image();
        img.onload = () => {
            // Add 5% padding inside the grid for aesthetics
            const padding = size * 0.05;
            ctx.drawImage(img, padding, padding, size - padding * 2, size - padding * 2);
            resolve();
        };
        img.onerror = () => reject('Failed to load character SVG');
        img.src = 'data:image/svg+xml;base64,' + btoa(svg);
    });
};

const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    // Simple word wrapper
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    // Safety limit for lines
    const maxLines = 3;
    let linesDrawn = 0;

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
            linesDrawn++;
            if (linesDrawn >= maxLines) {
                line = line.trim() + '...';
                break;
            }
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, currentY);
};
