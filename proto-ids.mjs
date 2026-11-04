import fs from 'fs';
const P = 'prototype/';
const V = 'v5.2.27';

const maps = {
  'prototype.html': {
    localeWrap: 'locale-wrap', localeBtn: 'locale-btn', themeBtn: 'theme-btn',
    hamburger: 'mobile-menu-toggle', scrim: 'drawer-scrim', drawer: 'mobile-drawer',
    drawerClose: 'drawer-close', main: 'main-content', charGrid: 'char-grid',
    detailPanel: 'detail-panel', weekGrid: 'week-grid', quizModal: 'quiz-modal',
    quizTitle: 'quiz-title', quizChar: 'quiz-char', quizOpts: 'quiz-options',
    quizFb: 'quiz-feedback', quizClose: 'quiz-close', quizNext: 'quiz-next',
    writeModal: 'writing-modal', writeChar: 'writing-char', writePy: 'writing-pinyin',
    writeMeta: 'writing-meaning', writeStroke: 'writing-stroke-count',
    writeClose: 'writing-close', writeCanvas: 'writing-canvas', writeHint: 'writing-hint',
    writeDots: 'writing-dots', writeClear: 'writing-clear', writeNext: 'writing-next',
    toastWrap: 'toast-container', playAudio: 'play-audio', startQuiz: 'start-quiz',
    nextChar: 'next-char',
  },
  'character-detail.html': {
    stage: 'variant-stage', traceCanvas: 'trace-canvas', tracePrev: 'trace-previous',
    traceNext: 'trace-next',
  },
  'wireframes.html': {
    d1: 'character-query-input', d2: 'email-input', f1: 'learning-goal-input',
    f2: 'daily-char-count-input', f3: 'language-input',
  },
  'learn.html': {
    themeToggle: 'theme-toggle', searchInput: 'character-search', hanziGrid: 'hanzi-grid',
    overlay: 'detail-overlay', dlgGlyph: 'detail-glyph', dlgTitle: 'detail-title',
    dlgMeta: 'detail-meta', dlgClose: 'detail-close', strokeGlyph: 'stroke-glyph',
    strokeList: 'stroke-list', wordList: 'word-list', exampleBox: 'example-box',
    markLearned: 'mark-learned', practiceBtn: 'practice-link', toast: 'learn-toast',
    toastTitle: 'toast-title', toastMsg: 'toast-message',
  },
  'practice.html': {
    themeToggle: 'theme-toggle', progLabel: 'progress-label', progPct: 'progress-percent',
    progFill: 'progress-fill', quizPanel: 'quiz-panel', qGlyph: 'quiz-glyph',
    qOptions: 'quiz-options', qFeedback: 'quiz-feedback', qNext: 'quiz-next',
    writePanel: 'writing-panel', wTarget: 'writing-target', wStrokes: 'writing-stroke-count',
    wSteps: 'writing-steps', wNext: 'writing-next',
  },
  'progress.html': { themeToggle: 'theme-toggle', heat: 'activity-heatmap' },
};

const containers = {
  'prototype.html': [
    ['<header class="site">', '<header class="site" id="site-header">'],
    ['<nav class="nav-links" aria-label="Primary">', '<nav class="nav-links" id="primary-nav" aria-label="Primary">'],
    ['<div class="locale-menu" role="listbox" aria-label="Language">', '<div class="locale-menu" id="locale-menu" role="listbox" aria-label="Language">'],
    ['<div class="container hero-inner">', '<div class="container hero-inner" id="home-hero">'],
    ['<footer class="site">', '<footer class="site" id="site-footer">'],
  ],
  'character-detail.html': [
    ['  <div class="stage-wrap">', '  <div class="stage-wrap" id="character-detail-main">'],
    ['    <div class="page-context">', '    <div class="page-context" id="page-context">'],
    ['  <nav class="proto-picker" data-position="top"', '  <nav class="proto-picker" id="variant-picker" data-position="top"'],
  ],
  'wireframes.html': [
    ['<div class="wrap">', '<div class="wrap" id="wireframes-main">'],
    ['  <header class="page-head">', '  <header class="page-head" id="wireframes-header">'],
    ['  <nav class="toc" aria-label="目录">', '  <nav class="toc" id="wireframes-toc" aria-label="目录">'],
    ['<form class="form" onsubmit="return false;">', '<form class="form" id="settings-form" onsubmit="return false;">'],
  ],
  'learn.html': [
    ['<header class="topbar">', '<header class="topbar" id="page-header">'],
    ['<nav class="mainnav">', '<nav class="mainnav" id="main-nav">'],
    ['  <div class="page-head">', '  <div class="page-head" id="learn-page-head">'],
    ['  <div class="filters">', '  <div class="filters" id="learn-filters">'],
    ['  <div class="dialog">', '  <div class="dialog" id="learn-detail-dialog">'],
  ],
  'practice.html': [
    ['<header class="topbar">', '<header class="topbar" id="page-header">'],
    ['<nav class="mainnav">', '<nav class="mainnav" id="main-nav">'],
    ['  <div class="page-head">', '  <div class="page-head" id="practice-page-head">'],
    ['  <div class="progress-wrap">', '  <div class="progress-wrap" id="practice-progress">'],
    ['  <div class="modes">', '  <div class="modes" id="practice-modes">'],
    ['    <div class="quiz">\n      <div class="q-glyph', '    <div class="quiz" id="quiz-card">\n      <div class="q-glyph'],
    ['    <div class="quiz">\n      <div class="canvas-wrap">', '    <div class="quiz" id="writing-card">\n      <div class="canvas-wrap">'],
  ],
  'progress.html': [
    ['<header class="topbar">', '<header class="topbar" id="page-header">'],
    ['<nav class="mainnav">', '<nav class="mainnav" id="main-nav">'],
    ['  <div class="page-head">', '  <div class="page-head" id="progress-page-head">'],
    ['  <div class="stats">', '  <div class="stats" id="progress-stats">'],
    ['  <div class="grid-2">', '  <div class="grid-2" id="progress-breakdown">'],
    ['  <div class="card">\n    <h3>最近活动</h3>', '  <div class="card" id="recent-activity-card">\n    <h3>最近活动</h3>'],
  ],
};

const copies = {
  'prototype.html': [
    ['>AI-POWERED · 水墨美学</span>', '>Interactive Learning</span>'],
    ['An elegant, AI-driven way to learn Hanzi — strokes, meanings, and culture, beautifully connected.',
      'HanziMaster helps you master Chinese characters through guided practice, stroke-order demonstrations, and immersive review.'],
    ['>AI Insights</h3>', '>Stroke Feedback</h3>'],
    ['Context-aware explanations, pronunciation, and example sentences generated on demand.',
      'Study each character with clear stroke-order guidance and structure hints to build confident, beautiful handwriting.'],
    ["badge:'AI-POWERED · 水墨美学'", "badge:'Interactive Learning'"],
    ["badge:'AI 驱动 · 水墨美学'", "badge:'互动学习'"],
    ['优雅而智能的汉字学习方式 —— 笔画、字义与文化，浑然一体。',
      '汉字大师通过引导式练习、笔顺演示与沉浸式复习，助你掌握汉字书写。'],
    ["title:'AI 智能洞察'", "title:'笔画反馈'"],
    ['按需生成语境化释义、发音与例句。', '借助清晰的笔顺指引与结构提示研习每个汉字，写出自信、美观的字迹。'],
    ["badge:'AI搭載 · 水墨美学'", "badge:'インタラクティブ学習'"],
    ['優雅でAI駆動の漢字学習 —— 画数、意味、文化が美しくつながる。',
      'HanziMasterは、ガイド付き練習、筆順デモ、没入型の復習を通して、中国語の文字をマスターするお手伝いをします。'],
    ["title:'AI洞察'", "title:'筆画フィードバック'"],
    ['文脈に応じた解説・発音・例文をオンデマンド生成。',
      '明確な筆順ガイドと構造ヒントで各文字を学び、自信に満ちた美しい書き味を身につけます。'],
    ["badge:'CON IA · Estética tinta'", "badge:'Aprendizaje Interactivo'"],
    ['Una forma elegante y con IA de aprender Hanzi — trazos, significados y cultura, bellamente conectados.',
      'HanziMaster te ayuda a dominar los caracteres chinos mediante práctica guiada, demostración del orden de trazos y repaso inmersivo.'],
    ["title:'IA inteligente'", "title:'Retroalimentación de Trazos'"],
    ['Explicaciones, pronunciación y ejemplos generados bajo demanda.',
      'Estudia cada carácter con guías claras del orden de trazos y pistas de estructura para escribir con soltura y belleza.'],
    ["feat:{ai:{title:'AI Insights'", "feat:{ai:{title:'Stroke Feedback'"],
  ],
  'wireframes.html': [
    ['<div class="feature"><div class="ico">🧠</div><h4>间隔记忆</h4><p>基于遗忘曲线的智能复习排程。</p></div>',
      '<div class="feature"><div class="ico">📈</div><h4>进度追踪</h4><p>用周热力图与连续天数回顾练习记录。</p></div>'],
  ],
};

function rename(src, map) {
  for (const [old, neu] of Object.entries(map)) {
    const e = old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    src = src.replace(new RegExp(`(\\b(?:id|for|aria-labelledby|aria-controls|aria-describedby|aria-owns)=")${e}(")`, 'g'), `$1${neu}$2`);
    src = src.replace(new RegExp(`#${e}(?![A-Za-z0-9_-])`, 'g'), '#' + neu);
    src = src.replace(new RegExp(`(getElementById\\(\\s*['"])${e}(['"]\\s*\\))`, 'g'), `$1${neu}$2`);
  }
  return src;
}

const report = [];
for (const name of Object.keys(maps)) {
  let src = fs.readFileSync(P + name, 'utf8');
  const original = src;
  src = rename(src, maps[name]);
  for (const [a, b] of (containers[name] || [])) {
    if (!src.includes(a)) report.push(`MISS container ${name}: ${a.slice(0, 60)}`);
    else src = src.replace(a, b);
  }
  for (const [a, b] of (copies[name] || [])) {
    if (!src.includes(a)) report.push(`MISS copy ${name}: ${a.slice(0, 60)}`);
    else src = src.split(a).join(b);
  }
  // 版本头：只替换第一处（头部注释）
  src = src.replace(/v5\.2\.(?:14|17|18)/, V);
  if (name === 'prototype.html') {
    src = src.replace('aria-labelledby="writeTitle"', 'aria-labelledby="writing-title"');
    const marker = '<div class="modal">\n    <div class="write-head">';
    if (!src.includes(marker)) report.push('MISS writing modal marker');
    else src = src.replace(marker, '<div class="modal">\n    <h3 id="writing-title" class="sr-only" data-i18n="practice.write.title">Writing Practice</h3>\n    <div class="write-head">');
    const cssMarker = '  /* ---------- 页脚 ---------- */';
    const srCss = '  /* ---------- 屏幕阅读器专用文本 ---------- */\n  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}\n';
    if (!src.includes(cssMarker)) report.push('MISS sr-only css marker');
    else src = src.replace(cssMarker, srCss + cssMarker);
  }
  fs.writeFileSync(P + name, src, 'utf8');
  report.push(`${name}: ${original.length} -> ${src.length} bytes`);
}
fs.writeFileSync('proto-ids-report.txt', report.join('\n') + '\n', 'utf8');
console.log(report.join('\n'));
