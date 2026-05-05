// app/pages/home/home.ts v2.1.3
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 animate-fade-in">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <mat-icon class="text-xs">auto_awesome</mat-icon>
            <span>Powered by Gemini AI</span>
          </div>
          <h2 class="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Master Chinese <br/>
            <span class="text-emerald-600 italic">One Stroke</span> at a Time.
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
            HanziMaster uses advanced AI to guide you through the intricate art of Chinese characters. 
            Personalized learning paths, real-time feedback, and immersive practice.
          </p>
          <div class="flex flex-wrap gap-4 pt-4">
            <button routerLink="/learn" class="bg-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 hover:scale-105 active:scale-95 flex items-center gap-2">
              Start Learning Now
              <mat-icon>arrow_forward</mat-icon>
            </button>
            <button class="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2">
              Explore Library
              <mat-icon>library_books</mat-icon>
            </button>
          </div>
        </div>

        <div class="relative lg:h-[600px] flex items-center justify-center">
          <div class="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-[4rem] rotate-3 -z-10 opacity-50"></div>
          <div class="bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700 w-full max-w-md transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div class="flex justify-between items-start mb-8">
              <div>
                <span class="text-4xl font-bold text-slate-900 dark:text-white hanzi-font">永</span>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">yǒng • Forever</p>
              </div>
              <div class="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-2 rounded-xl">
                <mat-icon>brush</mat-icon>
              </div>
            </div>
            
            <div class="aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-600 flex items-center justify-center relative overflow-hidden group">
              <span class="text-9xl text-slate-200 dark:text-slate-700 group-hover:text-emerald-100 dark:group-hover:text-emerald-900/50 transition-colors duration-500 hanzi-font">永</span>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
              </div>
            </div>

            <div class="mt-8 space-y-4">
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-500 dark:text-slate-400">Stroke Count</span>
                <span class="font-semibold text-slate-900 dark:text-white">5 Strokes</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full w-3/5"></div>
              </div>
              <p class="text-xs text-slate-400 dark:text-slate-500 text-center italic">"The character for 'forever' contains all 8 basic strokes."</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-24 grid md:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
          <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <mat-icon>psychology</mat-icon>
          </div>
          <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">AI-Powered Insights</h3>
          <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Gemini AI analyzes your handwriting and provides instant feedback on stroke order, balance, and aesthetics.
          </p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
          <div class="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <mat-icon>history_edu</mat-icon>
          </div>
          <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">Etymology & Culture</h3>
          <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Discover the stories behind the characters. Understand how they evolved from ancient pictographs to modern forms.
          </p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
          <div class="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <mat-icon>track_changes</mat-icon>
          </div>
          <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">Adaptive Learning</h3>
          <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Our algorithm adapts to your pace, focusing on the characters you find challenging while reinforcing what you know.
          </p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {}
