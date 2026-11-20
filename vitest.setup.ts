// vitest.setup.ts v5.2.52
import '@testing-library/jest-dom/vitest';

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

// 始终用同一份内存 Storage 覆盖，避免 Node 24+ 实验性 localStorage 与 jsdom getter
// 造成「每次访问返回不同实例」——storage.test.ts 对实例 setItem 的 mock 会因此失效（CI 实测）。
const memory = createMemoryStorage();
Object.defineProperty(globalThis, 'localStorage', { value: memory, configurable: true, writable: true });
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', { value: memory, configurable: true, writable: true });
}
