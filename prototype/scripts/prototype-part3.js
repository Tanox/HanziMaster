// prototype/scripts/prototype-part3.js v5.2.27 · JS part 3/3
/* ===================== 书写弹窗 ===================== */
const writeModal = $('#writing-modal');
let writeIdx = 0;
let writeStrokeIdx = 0;   // 当前已引导的笔画数（笔顺引导演示）
let writeAccuracy = 0;    // 模拟描红准确度（演示）
function openWrite(){ writeIdx=0; fillWrite(); writeModal.classList.add('open'); requestAnimationFrame(setupCanvas); }
function resetWrite(){
  writeStrokeIdx = 0; writeAccuracy = 0;
  buildWriteDots(CHARACTERS[writeIdx].strokes);
  setupCanvas();
  refreshWriteHint();
}
function fillWrite(){
  const c = CHARACTERS[writeIdx];
  $('#writing-char').textContent = c.hanzi;
  $('#writing-pinyin').textContent = c.pinyin;
  $('#writing-meaning').textContent = c.en;
  $('#writing-stroke-count').textContent = strokeCount(c.strokes);
  resetWrite();
}
$('#writing-clear').addEventListener('click', resetWrite);
$('#writing-next').addEventListener('click', ()=>{ writeIdx=(writeIdx+1)%CHARACTERS.length; fillWrite(); });
writeModal.addEventListener('click', e=>{ if(e.target===writeModal) writeModal.classList.remove('open'); });
$('#writing-close').addEventListener('click', ()=>writeModal.classList.remove('open'));

function setupCanvas(){
  const canvas = $('#writing-canvas'); if(!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width*dpr; canvas.height = rect.height*dpr;
  const ctx = canvas.getContext('2d'); ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,rect.width,rect.height);
  ctx.lineWidth = 4; ctx.lineCap='round'; ctx.lineJoin='round';
  const fg = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim() || '#1a1a1a';
  ctx.strokeStyle = fg;
  ctx.font = `${Math.min(rect.width,rect.height)*0.42}px "Noto Serif SC", serif`;
  ctx.fillStyle = fg; ctx.globalAlpha = isDark ? 0.10 : 0.07;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(CHARACTERS[writeIdx].hanzi, rect.width/2, rect.height/2);
  ctx.globalAlpha = 1;
  canvas._ctx = ctx; canvas._drawing=false; canvas._last=null;
}
function canvasPos(canvas, e){
  const r = canvas.getBoundingClientRect();
  const p = e.touches ? e.touches[0] : e;
  return { x:p.clientX-r.left, y:p.clientY-r.top };
}
// 笔顺引导演示：在灰字底图上叠加当前笔画的示意轨迹
function drawStrokeHint(idx){
  const canvas = $('#writing-canvas'); if(!canvas) return;
  const ctx = canvas._ctx; if(!ctx) return;
  const rect = canvas.getBoundingClientRect();
  const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#c53d43';
  // 依据笔画序号在画布网格内分布一段示意折线，仅用于原型演示顺序
  const cols = 3, rows = 3;
  const cx = rect.width * (0.2 + 0.3*(idx % cols));
  const cy = rect.height * (0.25 + 0.25*Math.floor(idx/cols));
  ctx.save();
  ctx.globalAlpha = 0.55; ctx.strokeStyle = primary; ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cx-rect.width*0.12, cy);
  ctx.quadraticCurveTo(cx, cy-rect.height*0.12, cx+rect.width*0.12, cy+rect.height*0.04);
  ctx.stroke();
  ctx.restore();
}
function buildWriteDots(count){
  const box = $('#writing-dots'); if(!box) return;
  box.innerHTML = '';
  for(let i=0;i<count;i++){ const d=document.createElement('i'); box.appendChild(d); }
}
function refreshWriteHint(){
  const hint = $('#writing-hint');
  const total = CHARACTERS[writeIdx].strokes;
  if(hint) hint.textContent = writeStrokeIdx < total
    ? `${DICT[STATE.lang].practice.strokeOrder}: ${writeStrokeIdx} / ${total}`
    : `${DICT[STATE.lang].practice.accuracy}: ${writeAccuracy}%`;
}
function advanceStroke(){
  const total = CHARACTERS[writeIdx].strokes;
  if(writeStrokeIdx >= total) return;
  setupCanvas(); // 重画灰字底图
  drawStrokeHint(writeStrokeIdx);
  writeStrokeIdx++;
  const dots = $('#writing-dots')?.children;
  if(dots && dots[writeStrokeIdx-1]) dots[writeStrokeIdx-1].classList.add('on');
  if(writeStrokeIdx >= total){
    writeAccuracy = Math.round(72 + Math.random()*23);
    toast('success', `${DICT[STATE.lang].practice.accuracy}: ${writeAccuracy}%`);
  }
  refreshWriteHint();
}
function bindCanvas(){
  const canvas = $('#writing-canvas');
  const down = e=>{
    const total = CHARACTERS[writeIdx].strokes;
    if(writeStrokeIdx < total){ e.preventDefault(); advanceStroke(); return; }
    canvas._drawing=true; canvas._last=canvasPos(canvas,e);
  };
  const move = e=>{ if(!canvas._drawing) return; e.preventDefault(); const ctx=canvas._ctx; const p=canvasPos(canvas,e); ctx.beginPath(); ctx.moveTo(canvas._last.x,canvas._last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); canvas._last=p; };
  const up = ()=>{ canvas._drawing=false; };
  canvas.addEventListener('mousedown',down); canvas.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
  canvas.addEventListener('touchstart',down,{passive:false}); canvas.addEventListener('touchmove',move,{passive:false}); canvas.addEventListener('touchend',up);
}
bindCanvas();

/* ===================== 通用 ===================== */
function closeModals(){ quizModal.classList.remove('open'); writeModal.classList.remove('open'); }
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

/* ===================== Toast ===================== */
const ICONS = {
  success:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 13l4 4L19 7"/></svg>',
  error:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  warning:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>',
  info:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 16v-4M12 8h.01M12 21a9 9 0 110-18 9 9 0 010 18z"/></svg>'
};
function toast(msg, type='info', ms=3000){
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.setAttribute('role','status');
  el.innerHTML = `<span class="tic">${ICONS[type]||ICONS.info}</span><span class="tmsg">${msg}</span>`;
  $('#toast-container').appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateX(120%)'; el.style.transition='opacity .3s, transform .3s'; setTimeout(()=>el.remove(),300); }, ms);
}

/* ===================== 初始化 ===================== */
applyI18n();
renderLearn();
renderDetail();
renderWeek();
// 欢迎提示（延迟，避免与首屏动画重叠）
setTimeout(()=> toast(t('toast.welcome'),'success', 2600), 700);
// 滚动进入视图时轻微揭示
const io = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target);} }); }, {threshold:0.12});
$$('.reveal').forEach(el=> io.observe(el));
