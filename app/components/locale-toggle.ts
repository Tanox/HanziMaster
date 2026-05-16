// app/components/locale-toggle.ts v2.2.0
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../i18n/i18n.service';

type Locale = 'en' | 'zh-CN' | 'zh-TW' | 'es' | 'ar' | 'fr' | 'pt-BR' | 'de' | 'ja' | 'ko' | 'ru';

@Component({
  selector: 'app-locale-toggle',
  imports: [MatIconModule],
  template: `
    <div class="relative">
      <button (click)="toggleMenu()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
        <mat-icon>language</mat-icon>
      </button>
      @if (isMenuOpen()) {
        <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
          @for (locale of availableLocales(); track locale) {
            <button
              (click)="selectLocale(locale)"
              [class.bg-emerald-50]="i18n.getLocale() === locale"
              [class.text-emerald-600]="i18n.getLocale() === locale"
              [class.dark:bg-emerald-900]="i18n.getLocale() === locale"
              [class.dark:text-emerald-400]="i18n.getLocale() === locale"
              class="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {{ localeNames[locale] }}
            </button>
          }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocaleToggle {
  i18n = inject(I18nService);
  isMenuOpen = signal(false);
  availableLocales = signal<Locale[]>(this.i18n.getAvailableLocales());

  localeNames: Record<Locale, string> = {
    'en': 'English',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'es': 'Español',
    'ar': 'العربية',
    'fr': 'Français',
    'pt-BR': 'Português (BR)',
    'de': 'Deutsch',
    'ja': '日本語',
    'ko': '한국어',
    'ru': 'Русский'
  };

  toggleMenu() {
    this.isMenuOpen.update(open => !open);
  }

  selectLocale(locale: Locale) {
    this.i18n.setLocale(locale);
    this.isMenuOpen.set(false);
  }
}
