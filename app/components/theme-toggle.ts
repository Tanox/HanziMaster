// app/components/theme-toggle.ts v2.2.0
import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const STORAGE_KEY = 'hanzi-master-theme';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatIconModule],
  template: `
    <button (click)="toggleTheme()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
      <mat-icon>{{ isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggle implements OnInit {
  isDark = signal(false);

  /**
   * Initialize theme from localStorage, system preference, or DOM state
   */
  ngOnInit() {
    let shouldBeDark: boolean = false;
    
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme !== null) {
        shouldBeDark = savedTheme === 'dark';
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        shouldBeDark = prefersDark;
      }
    } catch (e) {
      console.warn('Failed to read theme from localStorage:', e);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      shouldBeDark = prefersDark;
    }
    
    const hasDarkClass = document.documentElement.classList.contains('dark');
    this.isDark.set(shouldBeDark);
    
    if (shouldBeDark && !hasDarkClass) {
      document.documentElement.classList.add('dark');
    } else if (!shouldBeDark && hasDarkClass) {
      document.documentElement.classList.remove('dark');
    }
  }

  /**
   * Toggle theme and save preference to localStorage
   */
  toggleTheme() {
    const newIsDark = !this.isDark();
    this.isDark.set(newIsDark);
    const newTheme = newIsDark ? 'dark' : 'light';
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }
}
