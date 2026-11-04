// prototype/scripts/practice-part1.js v5.2.27 · JS part 1/1
  // ===== 测验数据 =====
  const quiz = [
    { hanzi:'木', py:'mù', options:['mù','huǒ','shuǐ','rì'], answer:0 },
    { hanzi:'火', py:'huǒ', options:['shān','huǒ','yuè','kǒu'], answer:1 },
    { hanzi:'水', py:'shuǐ', options:['rì','shuǐ','dà','rén'], answer:1 },
    { hanzi:'山', py:'shān', options:['shān','èr','sān','mù'], answer:0 },
    { hanzi:'日', py:'rì', options:['yuè','kǒu','rì','huǒ'], answer:2 },
  ];
  let qi = 0, correct = 0;
  const qGlyph=document.getElementById('quiz-glyph'), qOptions=document.getElementById('quiz-options'),
        qFeedback=document.getElementById('quiz-feedback'), qNext=document.getElementById('quiz-next'),
        progFill=document.getElementById('progress-fill'), progLabel=document.getElementById('progress-label'), progPct=document.getElementById('progress-percent');

  function loadQuiz(){
    const q=quiz[qi]; qGlyph.textContent=q.hanzi; qFeedback.className='quiz-feedback'; qNext.disabled=true;
    qOptions.innerHTML='';
    const keys=['A','B','C','D'];
    q.options.forEach((opt,i)=>{
      const b=document.createElement('button'); b.className='opt'; b.innerHTML=`<span class="key">${keys[i]}</span><span>${opt}</span>`;
      b.onclick=()=>choose(b,i,q); qOptions.appendChild(b);
    });
    updateProg();
  }
  function choose(btn,idx,q){
    const opts=[...qOptions.children]; opts.forEach(o=>o.disabled=true);
    if(idx===q.answer){ btn.classList.add('correct'); correct++; qFeedback.className='quiz-feedback ok'; qFeedback.textContent=`✓ 正确！${q.hanzi} 读作 ${q.py}。`; }
    else { btn.classList.add('wrong'); opts[q.answer].classList.add('correct'); qFeedback.className='quiz-feedback no'; qFeedback.textContent=`✗ 正确答案是 ${q.options[q.answer]}（${q.py}）。`; }
    qNext.disabled=false;
  }
  function updateProg(){ const pct=Math.round((qi)/quiz.length*100); progFill.style.width=pct+'%'; progLabel.textContent=`第 ${Math.min(qi+1,quiz.length)} / ${quiz.length} 题`; progPct.textContent=pct+'%'; }
  qNext.onclick=()=>{ if(qi<quiz.length-1){ qi++; loadQuiz(); } else { finish(); } };
  function finish(){
    updateProg(); progFill.style.width='100%'; progPct.textContent='100%'; progLabel.textContent='完成';
    qGlyph.textContent='🎉'; qOptions.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--muted-foreground);">本次测验正确率 ${correct}/${quiz.length}。继续保持！</div>`;
    qFeedback.className='quiz-feedback ok'; qFeedback.textContent='已完成本轮练习。'; qNext.textContent='再来一轮 ↺'; qNext.disabled=false;
    qNext.onclick=()=>{ qi=0; correct=0; qNext.textContent='下一题 →'; qNext.onclick=()=>{ if(qi<quiz.length-1){qi++;loadQuiz();}else{finish();} }; loadQuiz(); };
  }
  loadQuiz();

  // 书写面板
  const writeChars=['水','火','木','山','日'];
  let wi=0;
  function loadWrite(){
    const c=writeChars[wi]; document.getElementById('writing-target').textContent=c;
    const strokes={水:4,火:4,木:4,山:3,日:4}[c]; document.getElementById('writing-stroke-count').textContent=strokes;
    const steps=document.getElementById('writing-steps'); steps.innerHTML='';
    for(let i=1;i<=strokes;i++){const s=document.createElement('div');s.className='step';s.textContent=i;steps.appendChild(s);}
    // 模拟描红进度
    [...steps.children].forEach((s,i)=>setTimeout(()=>s.classList.add('done'),(i+1)*400));
  }
  document.getElementById('writing-next').onclick=()=>{ wi=(wi+1)%writeChars.length; loadWrite(); };
  loadWrite();

  // 模式切换
  document.querySelectorAll('.mode').forEach(m=>m.onclick=()=>{
    document.querySelectorAll('.mode').forEach(x=>x.classList.remove('is-active')); m.classList.add('is-active');
    const isQuiz=m.dataset.mode==='quiz';
    document.getElementById('quiz-panel').style.display=isQuiz?'block':'none';
    document.getElementById('writing-panel').classList.toggle('is-active',!isQuiz);
  });

  const tgl=document.getElementById('theme-toggle');
  tgl.onclick=()=>{ const d=document.documentElement.classList.toggle('dark'); localStorage.setItem('hm-theme',d?'dark':'light'); };
  if(localStorage.getItem('hm-theme')==='dark') document.documentElement.classList.add('dark');
