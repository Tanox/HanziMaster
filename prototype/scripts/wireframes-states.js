// prototype/scripts/wireframes-states.js · 断点指示器与动画重播 · v5.2.31
// 供 wireframes.html §3.5「组件状态可视化」使用。
(function () {
  'use strict';

  // Tailwind 断点：sm 640 / md 768 / lg 1024 / xl 1280
  var BREAKPOINTS = [
    [1280, 'xl'],
    [1024, 'lg'],
    [768, 'md'],
    [640, 'sm'],
  ];
  var badge = document.getElementById('bp-badge');

  function breakpointLabel() {
    var w = window.innerWidth;
    for (var i = 0; i < BREAKPOINTS.length; i++) {
      if (w >= BREAKPOINTS[i][0]) return w + 'px · ' + BREAKPOINTS[i][1] + '+';
    }
    return w + 'px · xs';
  }

  function updateBadge() {
    if (badge) badge.textContent = breakpointLabel();
  }

  window.addEventListener('resize', updateBadge);
  updateBadge();

  var replay = document.getElementById('anim-replay');
  var glyph = document.getElementById('anim-glyph');
  if (replay && glyph) {
    replay.addEventListener('click', function () {
      glyph.classList.remove('animate-brush');
      void glyph.offsetWidth; // 强制重排以重启动画
      glyph.classList.add('animate-brush');
    });
  }
})();
