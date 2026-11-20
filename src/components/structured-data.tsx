// src/components/structured-data.tsx v5.2.57
// JSON-LD 注入组件：数据由纯函数按语言/路由生成，逻辑见 lib/structured-data-graph.ts。
import type { SupportedLocale } from '@/lib/site';
import { buildStructuredDataGraph } from '@/lib/structured-data-graph';

export function StructuredData({ locale, path }: { locale: SupportedLocale; path: string }) {
  const data = buildStructuredDataGraph(locale, path);

  // 数据来自静态常量与已校验的 locale；用文本子节点避免 dangerouslySetInnerHTML。
  return (
    <script id="structured-data" type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
}
