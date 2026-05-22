// app/pages/learn/learn.ts v2.2.0
import { Component, ChangeDetectionStrategy, signal, inject, computed, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../../i18n/i18n.service';

interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
}

@Component({
  selector: 'app-learn',
  imports: [MatIconModule],
  template: `
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">{{ i18n.t().learn.title }}</h2>
          <p class="text-slate-500 dark:text-slate-400">{{ i18n.t().learn.subtitle }}</p>
        </div>
        <div class="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full">
          <mat-icon class="text-sm">local_fire_department</mat-icon>
          <span>{{ i18n.t().learn.streak }}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        @for (char of characters(); track char.id) {
          <button
            (click)="selectCharacter(char)"
            class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group text-center relative overflow-hidden"
          >
            @if (selectedCharacterId() === char.id) {
              <div class="absolute inset-0 border-2 border-emerald-500 rounded-3xl pointer-events-none"></div>
            }
            <span class="text-4xl font-bold text-slate-900 dark:text-white mb-2 block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors hanzi-font">{{ char.hanzi }}</span>
            <span class="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">{{ char.pinyin }}</span>
          </button>
        }
      </div>

      @if (selectedCharacter(); as char) {
        <div class="mt-12 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-lg">
          <div class="flex flex-col md:flex-row gap-8 items-center">
            <div class="w-40 h-40 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-600">
              <span class="text-8xl text-slate-800 dark:text-slate-200 hanzi-font">{{ char.hanzi }}</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-4">
                <h3 class="text-3xl font-bold text-slate-900 dark:text-white hanzi-font">{{ char.hanzi }}</h3>
                <span class="text-xl text-slate-500 dark:text-slate-400">{{ char.pinyin }}</span>
              </div>
              <p class="text-slate-600 dark:text-slate-300 text-lg mb-6">{{ char.meaning }}</p>
              <div class="flex gap-4">
                <button class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2">
                  <mat-icon>edit</mat-icon>
                  {{ i18n.t().learn.practiceWriting }}
                </button>
                <button class="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-2">
                  <mat-icon>volume_up</mat-icon>
                  {{ i18n.t().learn.hearPronunciation }}
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Learn implements OnInit {
  i18n = inject(I18nService);

  baseCharacters = [
    { id: 1, hanzi: '一', pinyin: 'yī' },
    { id: 2, hanzi: '二', pinyin: 'èr' },
    { id: 3, hanzi: '三', pinyin: 'sān' },
    { id: 4, hanzi: '人', pinyin: 'rén' },
    { id: 5, hanzi: '大', pinyin: 'dà' },
    { id: 6, hanzi: '小', pinyin: 'xiǎo' },
    { id: 7, hanzi: '口', pinyin: 'kǒu' },
    { id: 8, hanzi: '日', pinyin: 'rì' },
    { id: 9, hanzi: '月', pinyin: 'yuè' },
    { id: 10, hanzi: '山', pinyin: 'shān' },
    { id: 11, hanzi: '水', pinyin: 'shuǐ' },
    { id: 12, hanzi: '火', pinyin: 'huǒ' },
  ] as const;

  characters = computed<Character[]>(() => {
    const translations = this.i18n.t().learn.characters;
    return this.baseCharacters.map(char => ({
      ...char,
      meaning: translations[char.hanzi as keyof typeof translations]?.meaning || ''
    }));
  });

  selectedCharacterId = signal<number | null>(null);
  selectedCharacter = signal<Character | null>(null);

  ngOnInit() {
    if (this.characters().length > 0) {
      this.selectCharacter(this.characters()[0]);
    }
  }

  /**
   * Select a character to view details, or deselect if already selected
   */
  selectCharacter(char: Character) {
    if (this.selectedCharacterId() === char.id) {
      this.selectedCharacterId.set(null);
      this.selectedCharacter.set(null);
    } else {
      this.selectedCharacterId.set(char.id);
      this.selectedCharacter.set(char);
    }
  }
}
