// app/components/theme-toggle.ts v2.1.3
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
   * Initialize theme from localStorage on component init
   */
  ngOnInit() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    this.isDark.set(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }

  /**
   * Toggle theme and save preference to localStorage
   */
  toggleTheme() {
    this.isDark.update(v => !v);
    const newTheme = this.isDark() ? 'dark' : 'light';
    
    if (this.isDark()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem(STORAGE_KEY, newTheme);
  }
}
