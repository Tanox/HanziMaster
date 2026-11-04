// vitest.setup.ts v5.2.31
// Node 22+ 的实验性 globalThis.localStorage（未提供 --localstorage-file 时为 undefined）
// 会遮蔽 jsdom 的实现，导致测试环境读写存储失败；此处统一兜底为内存 Storage。
function createMemoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (k: string) => (map.has(k) ? (map.get(k) as string) : null),
    key: (i: number) => Array.from(map.keys())[i] ?? null,
    removeItem: (k: string) => {
      map.delete(k);
    },
    setItem: (k: string, v: string) => {
      map.set(k, String(v));
    },
  } as Storage;
}

const g = globalThis as unknown as { localStorage?: Storage; window?: unknown };
if (typeof g.localStorage === 'undefined') {
  g.localStorage = createMemoryStorage();
}
if (typeof window !== 'undefined' && typeof (window as { localStorage?: Storage }).localStorage === 'undefined') {
  (window as { localStorage?: Storage }).localStorage = g.localStorage;
}
