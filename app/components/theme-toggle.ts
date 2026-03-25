import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatIconModule],
  template: `
    <button (click)="toggleTheme()" class="p-2 rounded-lg hover:bg-slate-100 transition-colors">
      <mat-icon>{{ isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggle {
  isDark = signal(false);

  toggleTheme() {
    this.isDark.update(v => !v);
    if (this.isDark()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
