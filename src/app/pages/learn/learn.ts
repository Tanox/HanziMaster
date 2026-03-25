import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-learn',
  imports: [MatIconModule],
  template: `
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-3xl font-bold tracking-tight mb-2">Daily Practice</h2>
          <p class="text-slate-500">Master the most common 100 characters.</p>
        </div>
        <div class="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
          <mat-icon class="text-sm">local_fire_department</mat-icon>
          <span>5 Day Streak</span>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        @for (char of characters(); track char.id) {
          <button class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group text-center">
            <span class="text-4xl font-bold text-slate-900 mb-2 block group-hover:text-emerald-600 transition-colors">{{ char.hanzi }}</span>
            <span class="text-xs text-slate-400 uppercase tracking-widest">{{ char.pinyin }}</span>
          </button>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Learn {
  characters = signal([
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
  ]);
}
