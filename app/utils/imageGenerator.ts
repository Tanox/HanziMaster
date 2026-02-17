// app/utils/imageGenerator.ts v1.1.0
import { CharacterAnalysis, AppSettings, Grade } from '../types';

interface GenerationOptions {
    char: string;
    pinyin: string;
    meaning: string;
    score?: number;
    grade?: Grade;
    theme: 'light' | 'dark';
}

/**
 * Generates a high-quality Zen-style sharing card.
 * Incorporates traditional aesthetics: Rice Paper, Ink, and Cinnabar Seal.
 */
export const generateShareImage = (options: GenerationOptions): Promise<string> => {
    return new Promise((resolve, reject) => {
        const { char, pinyin, meaning, score, grade, theme } = options;
        const canvas = document.createElement('canvas');
        
        // 3:4 High-res ratio for social sharing
        canvas.width = 1200;
        canvas.height = 1600;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas context unavailable');

        const isDark = theme === 'dark';
        const colors = {
            paper: isDark ? '#1e293b' : '#fdfbf7',
            ink: isDark ? '#f8fafc' : '#0f172a',
            vermilion: '#bc221b',
            accent: isDark ? '#38bdf8' : '#0d9488'
        };

        // 1. Draw Background (Rice Paper Texture)
        ctx.fillStyle = colors.paper;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Simulated paper grain
        for (let i = 0; i < 50000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const opacity = Math.random() * 0.04;
            ctx.fillStyle = `rgba(0,0,0,${opacity})`;
            ctx.fillRect(x, y, 1, 1);
        }

        // 2. Draw Decorative Border (Traditional silk mount style)
        ctx.strokeStyle = colors.ink;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.1;
        ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
        ctx.globalAlpha = 1.0;

        // 3. Draw Character (Large Zen Style)
        ctx.font = "bold 650px 'Noto Serif SC', serif";
        ctx.fillStyle = colors.ink;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Slight ink bleed effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = colors.ink;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText(char, canvas.width / 2, canvas.height * 0.42);
        
        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // 4. Draw Pinyin & Meaning
        ctx.font = "bold 90px 'Inter', sans-serif";
        ctx.fillStyle = colors.accent;
        ctx.fillText(pinyin, canvas.width / 2, canvas.height * 0.68);

        ctx.font = "500 56px 'Inter', sans-serif";
        ctx.fillStyle = colors.ink;
        ctx.globalAlpha = 0.7;
        const wrappedMeaning = meaning.length > 25 ? meaning.substring(0, 22) + '...' : meaning;
        ctx.fillText(wrappedMeaning, canvas.width / 2, canvas.height * 0.76);
        ctx.globalAlpha = 1.0;

        // 5. Draw Practice Score (Optional)
        if (score !== undefined) {
            const gradeLabel = grade === Grade.EXQUISITE ? '神品' : (grade === Grade.MASTERFUL ? '妙品' : '能品');
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height * 0.88);
            
            // Score Badge
            ctx.fillStyle = colors.vermilion;
            ctx.font = "bold 100px 'Noto Serif SC'";
            ctx.fillText(`${gradeLabel} ${score}`, 0, 0);
            ctx.restore();
        }

        // 6. Draw Traditional Cinnabar Seal (Bottom Right)
        const sealX = canvas.width - 280;
        const sealY = canvas.height - 280;
        const sealSize = 180;
        
        ctx.save();
        ctx.translate(sealX, sealY);
        ctx.rotate(-0.1); // Natural hand-stamped tilt
        
        ctx.fillStyle = colors.vermilion;
        ctx.beginPath();
        ctx.roundRect(0, 0, sealSize, sealSize, 12);
        ctx.fill();

        ctx.font = "bold 60px 'Noto Serif SC'";
        ctx.fillStyle = colors.paper;
        ctx.textAlign = 'center';
        ctx.fillText("汉字", sealSize / 2, sealSize * 0.45);
        ctx.fillText("大师", sealSize / 2, sealSize * 0.82);
        ctx.restore();

        // 7. Footer text
        ctx.font = "40px 'Inter'";
        ctx.fillStyle = colors.ink;
        ctx.globalAlpha = 0.3;
        ctx.textAlign = 'left';
        ctx.fillText("HanziMaster • The Digital Calligraphy Classroom", 120, canvas.height - 100);

        resolve(canvas.toDataURL('image/png', 0.9));
    });
};
