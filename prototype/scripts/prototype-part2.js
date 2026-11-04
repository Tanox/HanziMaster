// prototype/scripts/prototype-part2.js v5.2.27 · JS part 2/3
/* ===================== 语言菜单 ===================== */
const localeWrap = $('#locale-wrap');
$('#locale-btn').addEventListener('click', (e)=>{
  e.stopPropagation();
  const open = localeWrap.classList.toggle('open');
  $('#locale-btn').setAttribute('aria-expanded', String(open));
});
$$('#locale-wrap .locale-menu button').forEach(b=>{
  b.addEventListener('click', ()=>{
    lang = b.dataset.lang;
    localStorage.setItem('hm-lang', lang);
    $$('#locale-wrap .locale-menu button').forEach(x=>x.setAttribute('aria-selected', String(x===b)));
    applyI18n();
    renderLearn(); renderDetail();
    localeWrap.classList.remove('open');
    $('#locale-btn').setAttribute('aria-expanded','false');
    toast(t('toast.selected') + ' · ' + (I18N[lang].brandSub), 'info');
  });
});
document.addEventListener('click', (e)=>{ if(!localeWrap.contains(e.target)){ localeWrap.classList.remove('open'); $('#locale-btn').setAttribute('aria-expanded','false'); } });

/* ===================== 视图切换 ===================== */
function goView(name){
  $$('.view').forEach(v=>v.classList.toggle('active', v.id === 'view-'+name));
  $$('[data-nav]').forEach(a=>a.classList.toggle('active', a.dataset.nav===name));
  window.scrollTo({top:0, behavior:'smooth'});
  closeDrawer();
}
$$('[data-nav]').forEach(a=> a.addEventListener('click', (e)=>{ e.preventDefault(); goView(a.dataset.nav); }));

/* ===================== 移动抽屉 ===================== */
const drawer = $('#mobile-drawer'), scrim = $('#drawer-scrim');
function openDrawer(){ drawer.classList.add('open'); scrim.classList.add('open'); $('#mobile-menu-toggle').setAttribute('aria-expanded','true'); }
function closeDrawer(){ drawer.classList.remove('open'); scrim.classList.remove('open'); $('#mobile-menu-toggle').setAttribute('aria-expanded','false'); }
$('#mobile-menu-toggle').addEventListener('click', openDrawer);
$('#drawer-close').addEventListener('click', closeDrawer);
scrim.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeDrawer(); closeModals(); } });

/* ===================== 学习页渲染 ===================== */
function renderLearn(){
  const grid = $('#char-grid');
  grid.innerHTML = '';
  CHARACTERS.forEach(c=>{
    const cell = document.createElement('button');
    cell.className = 'char-cell' + (c.hanzi===selectedId ? ' selected':'');
    cell.setAttribute('role','option');
    cell.setAttribute('aria-selected', String(c.hanzi===selectedId));
    cell.setAttribute('aria-label', c.hanzi + ' ' + c.pinyin);
    cell.innerHTML = `<span class="glyph serif-font">${c.hanzi}</span><span class="py">${c.pinyin}</span>`;
    cell.addEventListener('click', ()=>{ selectedId = c.hanzi; renderLearn(); renderDetail(); toast(t('toast.selected')+' · '+c.hanzi, 'info'); });
    grid.appendChild(cell);
  });
}
function renderDetail(){
  const c = CHARACTERS.find(x=>x.hanzi===selectedId) || CHARACTERS[0];
  const dots = Array.from({length:c.strokes}).map(()=>'<i></i>').join('');
  $('#detail-panel').innerHTML = `
    <div class="stage">
      <div class="big">
        <div class="halo"></div>
        <div class="glyph serif-font">${c.hanzi}</div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;align-items:center;margin-top:18px;flex-wrap:wrap">
        <span class="badge badge-primary">${strokeCount(c.strokes)}</span>
        <button class="btn btn-ghost" id="play-audio" style="padding:8px 14px">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7M19 5a9 9 0 010 14"/></svg>
          ${t('learn.playAudio')}
        </button>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:18px;flex-wrap:wrap">
        <button class="btn btn-primary" id="start-quiz">${t('learn.startQuiz')}</button>
        <button class="btn btn-outline" id="next-char">${t('learn.nextChar')}</button>
      </div>
    </div>
    <div>
      <div class="kv"><div class="k">${t('learn.pinyin')}</div><div class="v mono-font">${c.pinyin}</div></div>
      <div class="kv"><div class="k">${t('learn.meaning')}</div><div class="v">${c.en}</div></div>
      <div class="words">
        <h3>${t('learn.words')}</h3>
        ${c.words.map(w=>`<div class="wrow"><div><div class="wt">${w.text}</div><div class="wp">${w.py}</div></div><div class="we">${w.en}</div></div>`).join('')}
      </div>
      <div style="margin-top:18px"><h3>${t('learn.strokeOrder')}</h3>
        <div class="stroke-box"><span class="glyph serif-font">${c.hanzi}</span></div>
        <div class="dots">${dots}</div>
      </div>
      <div style="margin-top:18px"><div class="kv"><div class="k">${t('learn.example')}</div>
        <div class="v" style="font-size:16px;font-family:var(--font-serif)">${c.example.s}</div>
        <div class="wp mono-font" style="font-size:13px;color:var(--muted-foreground)">${c.example.py}</div>
        <div class="we" style="font-size:13px;color:var(--muted-foreground)">${c.example.en}</div>
      </div></div>
    </div>`;
  $('#play-audio').addEventListener('click', ()=> toast(t('toast.copied'),'info'));
  $('#start-quiz').addEventListener('click', openQuiz);
  $('#next-char').addEventListener('click', ()=>{ nextCharacter(); });
}
function nextCharacter(){
  const idx = CHARACTERS.findIndex(x=>x.hanzi===selectedId);
  selectedId = CHARACTERS[(idx+1)%CHARACTERS.length].hanzi;
  renderLearn(); renderDetail();
  toast(t('toast.selected')+' · '+selectedId, 'info');
}

/* ===================== 练习页：周进度 ===================== */
function renderWeek(){
  const days = ['mon','tue','wed','thu','fri','sat','sun'];
  const done = [true,true,true,true,false,false,false]; // 周五(今天)未完成，仅高亮
  const todayIdx = 4;
  $('#week-grid').innerHTML = days.map((d,i)=>`
    <div class="day ${done[i]?'done':''} ${i===todayIdx?'today':''}">
      <span class="dlabel">${t('practice.'+d)}</span>
      <span class="dcheck">${done[i]?'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 13l4 4L19 7"/></svg>':(i===todayIdx?t('practice.today'):t('practice.pending'))}</span>
    </div>`).join('');
}
$$('[data-open]').forEach(btn=> btn.addEventListener('click', ()=>{
  const kind = btn.dataset.open;
  if (kind==='write') openWrite();
  else if (kind==='quiz') openQuiz();
  else if (kind==='progress') toast(t('toast.saved'),'success');
}));

/* ===================== 测验弹窗 ===================== */
let quizIdx = 0, quizAnswered = false;
const quizModal = $('#quiz-modal');
function openQuiz(){ quizIdx = 0; quizAnswered=false; buildQuiz(); quizModal.classList.add('open'); }
function buildQuiz(){
  const c = CHARACTERS[quizIdx];
  $('#quiz-char').textContent = c.hanzi;
  // 4 个候选拼音（含正确项）
  const others = CHARACTERS.filter(x=>x.hanzi!==c.hanzi).map(x=>x.pinyin);
  const opts = [c.pinyin, ...shuffle(others).slice(0,3)];
  shuffle(opts);
  const box = $('#quiz-options'); box.innerHTML='';
  quizAnswered=false;
  $('#quiz-feedback').textContent=''; $('#quiz-feedback').className='quiz-fb';
  $('#quiz-next').textContent = t('quiz.next');
  opts.forEach(py=>{
    const b = document.createElement('button');
    b.className='quiz-opt'; b.textContent = py;
    b.addEventListener('click', ()=>{
      if (quizAnswered) return;
      quizAnswered = true;
      const correct = py===c.pinyin;
      b.classList.add(correct?'correct':'wrong');
      if (!correct){ $$('#quiz-options .quiz-opt').forEach(o=>{ if(o.textContent===c.pinyin) o.classList.add('correct'); }); }
      const fb = $('#quiz-feedback'); fb.textContent = correct? t('quiz.correct') : t('quiz.incorrect');
      fb.className = 'quiz-fb ' + (correct?'ok':'no');
      if (correct) setTimeout(()=>{ if(quizIdx<CHARACTERS.length-1){ quizIdx++; buildQuiz(); } else { toast(t('toast.saved'),'success'); } }, 900);
    });
    box.appendChild(b);
  });
}
$('#quiz-close').addEventListener('click', ()=> quizModal.classList.remove('open'));
$('#quiz-next').addEventListener('click', ()=>{ if(quizIdx<CHARACTERS.length-1){ quizIdx++; buildQuiz(); } else quizModal.classList.remove('open'); });
quizModal.addEventListener('click', e=>{ if(e.target===quizModal) quizModal.classList.remove('open'); });

