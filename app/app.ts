// app/app.ts v2.1.4
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ThemeToggle } from './components/theme-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ThemeToggle],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 flex flex-col">
      <header class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <a routerLink="/" class="flex items-center gap-2">
          <span class="text-2xl font-bold text-emerald-600">汉</span>
          <h1 class="text-xl font-semibold tracking-tight">HanziMaster</h1>
        </a>
        <nav class="flex items-center gap-4">
          <a routerLink="/learn" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors">Learn</a>
          <button class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors">Practice</button>
          <app-theme-toggle></app-theme-toggle>
          <button class="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">Sign In</button>
        </nav>
      </header>

      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>

      <footer class="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-8 px-6 text-center">
        <p class="text-sm text-slate-500 dark:text-slate-400">© 2026 HanziMaster 汉字大师 v2.1.4. All rights reserved.</p>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
