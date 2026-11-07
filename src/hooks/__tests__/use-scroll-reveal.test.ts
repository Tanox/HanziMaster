// src/hooks/__tests__/use-scroll-reveal.test.ts v5.2.35

import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useScrollReveal } from '../use-scroll-reveal';

class MockIntersectionObserver {
  static last: MockIntersectionObserver | null = null;
  observed: Element[] = [];
  callback: (entries: Array<{ isIntersecting: boolean; target: Element }>) => void;
  disconnected = false;

  constructor(callback: (entries: Array<{ isIntersecting: boolean; target: Element }>) => void) {
    this.callback = callback;
    MockIntersectionObserver.last = this;
  }

  observe(el: Element) {
    this.observed.push(el);
  }
  unobserve() {}
  disconnect() {
    this.disconnected = true;
  }
  trigger(isIntersecting: boolean) {
    this.callback(this.observed.map((target) => ({ isIntersecting, target })));
  }
}

describe('useScrollReveal', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    document.body.innerHTML = '<div class="reveal" id="reveal-target"></div>';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('observes reveal elements and marks intersecting ones', () => {
    const { unmount } = renderHook(() => useScrollReveal());
    const observer = MockIntersectionObserver.last!;
    expect(observer.observed).toHaveLength(1);

    observer.trigger(false);
    expect(document.getElementById('reveal-target')?.classList.contains('revealed')).toBe(false);

    observer.trigger(true);
    expect(document.getElementById('reveal-target')?.classList.contains('revealed')).toBe(true);

    unmount();
    expect(observer.disconnected).toBe(true);
  });
});
