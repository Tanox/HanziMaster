// src/app/practice/loading.tsx v5.2.38
// /practice 路由骨架屏：占位与真实布局（标题区 + 练习选项 + 周进度卡）尺寸接近，避免布局跳动（P2-13）

export default function PracticeLoading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-ink-50/50 to-background dark:from-ink-950/50 dark:to-background" aria-hidden="true">
      <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
        {/* 标题区占位 */}
        <div className="text-center mb-16">
          <div className="h-12 w-64 max-w-full mx-auto rounded-xl bg-ink-100 dark:bg-ink-800 animate-pulse mb-4" />
          <div className="h-6 w-80 max-w-full mx-auto rounded-lg bg-ink-100 dark:bg-ink-800 animate-pulse" />
        </div>

        {/* 练习选项占位（书写 / 拼音测验，两列） */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="h-44 rounded-2xl bg-ink-100 dark:bg-ink-800 animate-pulse" />
          ))}
        </div>

        {/* 周进度卡占位 */}
        <div className="bg-card/80 dark:bg-ink-900/80 rounded-4xl p-10 border border-ink-100 dark:border-ink-800 shadow-ink-lg">
          <div className="h-7 w-40 rounded-lg bg-ink-100 dark:bg-ink-800 animate-pulse mb-8" />
          <div className="grid grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-20 rounded-xl bg-ink-100 dark:bg-ink-800 animate-pulse" />
            ))}
          </div>
          <div className="h-16 rounded-xl bg-ink-100 dark:bg-ink-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
