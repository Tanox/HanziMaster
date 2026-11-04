// prototype/scripts/character-detail-part1.js v5.2.27 · JS part 1/2
  /* ============ 变体渲染函数 ============ */
  var WORD_EXAMPLES = [
    { hanzi: '一日', py: 'yī rì', gloss: 'One day' },
    { hanzi: '第一次', py: 'dì yī cì', gloss: 'The first time' },
    { hanzi: '统一', py: 'tǒng yī', gloss: 'Unified' },
  ];

  function renderScroll() {
    return '' +
    '<article class="scroll-card" id="char-study-card-scroll">' +
      '<div class="scroll-top">' +
        '<span class="scroll-badge">基础汉字 · 01</span>' +
        '<span class="spacer"></span>' +
        '<button class="icon-btn" aria-label="播放读音">' +
          '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/></svg>' +
        '</button>' +
        '<button class="icon-btn" aria-label="标记已掌握">' +
          '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="scroll-body">' +
        '<div class="scroll-hero">' +
          '<div class="scroll-char">一</div>' +
          '<div class="scroll-meta">' +
            '<div class="scroll-pinyin">yī</div>' +
            '<div class="scroll-meaning">One / First</div>' +
            '<div class="scroll-strokes">' +
              '<span class="stroke-count-label">笔画</span>' +
              '<span class="dot"></span><span class="dot empty"></span><span class="dot empty"></span>' +
            '</div>' +
          '</div>' +
          '<div class="scroll-actions">' +
            '<button class="btn-primary">开始测验</button>' +
            '<button class="btn-outline">下一字</button>' +
          '</div>' +
        '</div>' +
        '<div class="scroll-panel">' +
          '<div class="scroll-block">' +
            '<h4>词组 <span class="cn">词</span></h4>' +
            WORD_EXAMPLES.map(function (w) {
              return '<div class="word-row"><div><span class="hanzi">' + w.hanzi + '</span> <span class="py">' + w.py + '</span></div><span class="gloss">' + w.gloss + '</span></div>';
            }).join('') +
          '</div>' +
          '<div class="scroll-block">' +
            '<h4>笔顺 <span class="cn">序</span></h4>' +
            '<div class="stroke-demo">' +
              '<div class="stroke-seq">' +
                '<span class="stroke-chip active" data-n="1">一</span>' +
                '<span class="stroke-chip" data-n="2">丨</span>' +
                '<span class="stroke-chip" data-n="3">乚</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderFlashcard() {
    return '' +
    '<article class="flash-card" id="char-study-card-flashcard">' +
      '<div class="flash-head">' +
        '<span class="index">#01 / 基础汉字</span>' +
        '<span class="badge">已掌握 ✓</span>' +
      '</div>' +
      '<div class="flash-main">' +
        '<div class="flash-topline">' +
          '<div class="flash-char">一</div>' +
          '<div class="flash-info">' +
            '<div class="pinyin">yī</div>' +
            '<div class="meaning">One · First · Unity</div>' +
            '<div class="flash-actions">' +
              '<button class="mini-btn primary">开始测验</button>' +
              '<button class="mini-btn">播放读音</button>' +
              '<button class="mini-btn">下一字</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<hr class="flash-divider" />' +
        '<div class="flash-section"><h4>词组</h4><span class="rule"></span></div>' +
        '<div class="chip-row">' +
          '<span class="word-chip">一日 <span class="gloss">one day</span></span>' +
          '<span class="word-chip">第一次 <span class="gloss">first time</span></span>' +
          '<span class="word-chip">统一 <span class="gloss">unified</span></span>' +
        '</div>' +
        '<div class="flash-section" style="margin-top:20px"><h4>笔顺</h4><span class="rule"></span></div>' +
        '<div class="tab-row" role="tablist">' +
          '<button class="tab active">演示</button>' +
          '<button class="tab">跟写</button>' +
        '</div>' +
        '<div class="flash-grid">' +
          '<span class="flash-cell filled active">一</span>' +
          '<span class="flash-cell">丨</span>' +
          '<span class="flash-cell">乚</span>' +
          '<span class="flash-cell"></span><span class="flash-cell"></span><span class="flash-cell"></span><span class="flash-cell"></span>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderAtelier() {
    return '' +
    '<article class="atelier-card" id="char-study-card-atelier">' +
      '<div class="atelier-head">' +
        '<span class="atelier-title">研习工作台</span>' +
        '<div class="atelier-progress">' +
          '<div class="bar"><div class="fill"></div></div>' +
          '<div class="meta"><span>本周掌握</span><span>3 / 7 字</span></div>' +
        '</div>' +
        '<button class="icon-btn" aria-label="播放读音">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="atelier-body">' +
        '<div class="atelier-desk">' +
          '<div class="atelier-desk-head">' +
            '<span class="atelier-char">一</span>' +
            '<span class="pinyin">yī · 一</span>' +
          '</div>' +
          '<div class="canvas-grid" id="trace-canvas">' +
            '<span class="canvas-cell traced">一</span>' +
            '<span class="canvas-cell">丨</span>' +
            '<span class="canvas-cell">乚</span>' +
            '<span class="canvas-cell"></span><span class="canvas-cell"></span><span class="canvas-cell"></span><span class="canvas-cell"></span>' +
          '</div>' +
          '<div class="canvas-tools">' +
            '<button class="tool-btn" id="trace-previous">上一笔</button>' +
            '<button class="tool-btn" id="trace-next">下一笔</button>' +
            '<span class="hint">点击格子逐笔跟写</span>' +
          '</div>' +
        '</div>' +
        '<div class="atelier-side">' +
          '<div class="atelier-block">' +
            '<h4>字源</h4>' +
            '<p class="etymology">“一” 指事，以一笔象征万物的开端。古人以横画计数，横为一，故义为一、首、专一。</p>' +
          '</div>' +
          '<div class="atelier-block">' +
            '<h4>词组</h4>' +
            '<div class="example-list">' +
              '<div class="example-item"><span class="hz">一日</span><span class="gloss">one day</span></div>' +
              '<div class="example-item"><span class="hz">统一</span><span class="gloss">unified</span></div>' +
              '<div class="example-item"><span class="hz">专一</span><span class="gloss">devoted</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="atelier-foot">' +
        '<button class="btn-outline">上一字</button>' +
        '<span class="spacer"></span>' +
        '<button class="btn-primary">开始测验</button>' +
      '</div>' +
    '</article>';
  }

  var variants = [renderScroll, renderFlashcard, renderAtelier];

