// prototype/scripts/character-detail-part2.js v5.2.27 · JS part 2/2
  /* ============ 变体内部交互（跟写演示） ============ */
  function wireInteractions() {
    var canvas = document.getElementById('trace-canvas');
    if (canvas) {
      var cells = canvas.querySelectorAll('.canvas-cell');
      cells.forEach(function (c, i) {
        c.addEventListener('click', function () {
          cells.forEach(function (x) { x.classList.remove('traced'); });
          for (var j = 0; j <= i; j++) cells[j].classList.add('traced');
        });
      });
    }
    var prev = document.getElementById('trace-previous');
    var next = document.getElementById('trace-next');
    if (prev && next && canvas) {
      var cells = canvas.querySelectorAll('.canvas-cell');
      var traced = function () { return Array.prototype.filter.call(cells, function (c) { return c.classList.contains('traced'); }).length; };
      prev.addEventListener('click', function () {
        var n = Math.max(0, traced() - 1);
        cells.forEach(function (x) { x.classList.remove('traced'); });
        for (var j = 0; j < n; j++) cells[j].classList.add('traced');
      });
      next.addEventListener('click', function () {
        var n = Math.min(cells.length, traced() + 1);
        cells.forEach(function (x) { x.classList.remove('traced'); });
        for (var j = 0; j < n; j++) cells[j].classList.add('traced');
      });
    }
    // 教学卡 tab
    document.querySelectorAll('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
      });
    });
  }

  /* ============ PICKER 行为契约（verbatim） ============ */
  var stage = document.getElementById('variant-stage');
  var picker = document.querySelector('.proto-picker');
  var highlight = picker.querySelector('.proto-picker-highlight');
  var items = Array.prototype.slice.call(picker.querySelectorAll('.proto-picker-item:not(.proto-picker-replay)'));
  var replay = picker.querySelector('.proto-picker-replay');
  var current = 0;

  function moveHighlight() {
    var el = items[current];
    highlight.style.width = el.offsetWidth + 'px';
    highlight.style.transform = 'translateX(' + el.offsetLeft + 'px)';
  }

  function mount(i) {
    stage.innerHTML = '';
    requestAnimationFrame(function () {
      stage.innerHTML = variants[i]();
      wireInteractions();
    });
  }

  function setActive(i) {
    if (i < 0 || i >= variants.length) return;
    current = i;
    items.forEach(function (el, j) {
      el.toggleAttribute('data-active', j === i);
      if (j === i) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    });
    moveHighlight();
    var url = new URL(location);
    url.searchParams.set('v', i + 1);
    history.replaceState(null, '', url);
    mount(i);
  }

  items.forEach(function (el, i) { el.addEventListener('click', function () { setActive(i); }); });
  replay.addEventListener('click', function () { mount(current); });
  window.addEventListener('resize', moveHighlight);

  document.addEventListener('keydown', function (e) {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var num = parseInt(e.key, 10);
    if (num >= 1 && num <= variants.length) setActive(num - 1);
    else if (e.key === 'ArrowRight') setActive((current + 1) % variants.length);
    else if (e.key === 'ArrowLeft') setActive((current - 1 + variants.length) % variants.length);
    else if (e.key === 'r' || e.key === 'R') mount(current);
  });

  setActive((parseInt(new URLSearchParams(location.search).get('v'), 10) || 1) - 1);
  requestAnimationFrame(function () { requestAnimationFrame(function () { picker.setAttribute('data-ready', ''); }); });
