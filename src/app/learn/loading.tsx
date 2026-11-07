// src/app/learn/loading.tsx v5.2.38
// /learn 路由骨架屏：占位与真实布局（标题区 + 12 字卡网格 + 详情大卡）尺寸接近，避免未来引入异步数据时布局跳动（P2-13）

// 与 character-grid.tsx 相同的网格断点，保证骨架与真实网格对齐
const GRID_CLASS = 'grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5 mb-12';

export default function LearnLoading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-ink-50/50 to-background dark:from-ink-950/50 dark:to-background" aria-hidden="true">
      <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
        {/* 标题区占位 */}
        <div className="text-center mb-12">
          <div className="h-12 w-72 max-w-full mx-auto rounded-xl bg-ink-100 dark:bg-ink-800 animate-pulse mb-4" />
          <div className="h-6 w-56 max-w-full mx-auto rounded-lg bg-ink-100 dark:bg-ink-800 animate-pulse" />
        </div>

        {/* 字符网格占位（12 个字卡） */}
        <div className={GRID_CLASS}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-ink-100 dark:bg-ink-800 animate-pulse" />
          ))}
        </div>

        {/* 详情大卡占位 */}
        <div className="bg-card/80 dark:bg-ink-900/80 rounded-4xl p-10 border border-ink-100 dark:border-ink-800 shadow-ink-lg">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="h-8 w-36 rounded-lg bg-ink-100 dark:bg-ink-800 animate-pulse" />
              <div className="h-40 w-40 mx-auto lg:mx-0 rounded-full bg-ink-100 dark:bg-ink-800 animate-pulse" />
              <div className="h-5 w-64 max-w-full rounded-lg bg-ink-100 dark:bg-ink-800 animate-pulse" />
            </div>
            <div className="space-y-6">
              <div className="h-24 rounded-xl bg-ink-100 dark:bg-ink-800 animate-pulse" />
              <div className="h-24 rounded-xl bg-ink-100 dark:bg-ink-800 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
