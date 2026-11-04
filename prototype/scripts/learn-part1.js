// prototype/scripts/learn-part1.js v5.2.27 · JS part 1/1
  // ===== 真实汉字数据（与 src/lib/characters.ts 对齐） =====
  const chars = [
    { hanzi:'一', py:'yī', en:'One', strokes:1, radical:'一', status:'mastered',
      words:[{w:'一个',p:'yí gè',e:'One (measure word)'},{w:'一月',p:'yī yuè',e:'January'},{w:'第一',p:'dì yī',e:'First'}],
      example:{s:'他是一个好人。',p:'Tā shì yī gè hǎo rén.',e:'He is a good person.'} },
    { hanzi:'二', py:'èr', en:'Two', strokes:2, radical:'二', status:'mastered',
      words:[{w:'二月',p:'èr yuè',e:'February'},{w:'第二',p:'dì èr',e:'Second'},{w:'二十',p:'èr shí',e:'Twenty'}],
      example:{s:'今天是二月二号。',p:'Jīntiān shì èr yuè èr hào.',e:"Today is February 2nd."} },
    { hanzi:'三', py:'sān', en:'Three', strokes:3, radical:'三', status:'learning',
      words:[{w:'三月',p:'sān yuè',e:'March'},{w:'三个',p:'sān gè',e:'Three items'},{w:'三十',p:'sān shí',e:'Thirty'}],
      example:{s:'我有三个苹果。',p:'Wǒ yǒu sān gè píngguǒ.',e:'I have three apples.'} },
    { hanzi:'人', py:'rén', en:'Person', strokes:2, radical:'人', status:'learning',
      words:[{w:'人们',p:'rénmen',e:'People'},{w:'大人',p:'dàrén',e:'Adult'},{w:'中国人',p:'Zhōngguó rén',e:'Chinese person'}],
      example:{s:'他是一个好人。',p:'Tā shì yī gè hǎo rén.',e:'He is a good person.'} },
    { hanzi:'大', py:'dà', en:'Big', strokes:3, radical:'大', status:'mastered',
      words:[{w:'大人',p:'dàrén',e:'Adult'},{w:'大学',p:'dàxué',e:'University'},{w:'伟大',p:'wěidà',e:'Great'}],
      example:{s:'这是一所大学。',p:'Zhè shì yī suǒ dàxué.',e:'This is a university.'} },
    { hanzi:'口', py:'kǒu', en:'Mouth', strokes:3, radical:'口', status:'new',
      words:[{w:'口水',p:'kǒushuǐ',e:'Saliva'},{w:'入口',p:'rùkǒu',e:'Entrance'},{w:'出口',p:'chūkǒu',e:'Exit'}],
      example:{s:'请从这个口出去。',p:'Qǐng cóng zhège kǒu chūqù.',e:'Please exit through this opening.'} },
    { hanzi:'日', py:'rì', en:'Sun / Day', strokes:4, radical:'日', status:'new',
      words:[{w:'日子',p:'rìzi',e:'Days'},{w:'明日',p:'míngrì',e:'Tomorrow'},{w:'日本',p:'Rìběn',e:'Japan'}],
      example:{s:'今天是好日子。',p:'Jīntiān shì hǎo rìzi.',e:'Today is a good day.'} },
    { hanzi:'月', py:'yuè', en:'Moon / Month', strokes:4, radical:'月', status:'learning',
      words:[{w:'月亮',p:'yuèliàng',e:'Moon'},{w:'月份',p:'yuèfèn',e:'Month'},{w:'正月',p:'zhēngyuè',e:'First month'}],
      example:{s:'今晚的月亮很美。',p:'Jīn wǎn de yuèliàng hěn měi.',e:'The moon is beautiful tonight.'} },
    { hanzi:'山', py:'shān', en:'Mountain', strokes:3, radical:'山', status:'mastered',
      words:[{w:'山水',p:'shānshuǐ',e:'Landscape'},{w:'上山',p:'shàngshān',e:'Climb mountain'},{w:'雪山',p:'xuěshān',e:'Snow mountain'}],
      example:{s:'我想去爬山。',p:'Wǒ xiǎng qù pá shān.',e:'I want to go mountain climbing.'} },
    { hanzi:'水', py:'shuǐ', en:'Water', strokes:4, radical:'水', status:'new',
      words:[{w:'水果',p:'shuǐguǒ',e:'Fruit'},{w:'河水',p:'héshuǐ',e:'River water'},{w:'喝水',p:'hēshuǐ',e:'Drink water'}],
      example:{s:'请给我一杯水。',p:'Qǐng gěi wǒ yī bēi shuǐ.',e:'Please give me a glass of water.'} },
    { hanzi:'火', py:'huǒ', en:'Fire', strokes:4, radical:'火', status:'learning',
      words:[{w:'火车',p:'huǒchē',e:'Train'},{w:'火苗',p:'huǒmiáo',e:'Flame'},{w:'火山',p:'huǒshān',e:'Volcano'}],
      example:{s:'小心火！',p:'Xiǎoxīn huǒ!',e:'Be careful with fire!'} },
    { hanzi:'木', py:'mù', en:'Wood / Tree', strokes:4, radical:'木', status:'mastered',
      words:[{w:'木头',p:'mùtou',e:'Wood'},{w:'树木',p:'shùmù',e:'Trees'},{w:'木马',p:'mùmǎ',e:'Hobby horse'}],
      example:{s:'这是一棵大树。',p:'Zhè shì yī kē dà shù.',e:'This is a big tree.'} },
  ];
  const statusMap = { mastered:{cls:'badge-mastered',label:'已掌握'}, learning:{cls:'badge-learning',label:'复习中'}, new:{cls:'badge-new',label:'新词'} };

  const grid = document.getElementById('hanzi-grid');
  function render(list){
    grid.innerHTML = '';
    list.forEach(c=>{
      const s = statusMap[c.status];
      const el = document.createElement('button');
      el.className = 'hz-card';
      el.setAttribute('aria-label', `${c.hanzi} ${c.py}`);
      el.innerHTML = `<div class="glyph serif-font">${c.hanzi}</div><div class="py">${c.py}</div><div class="en">${c.en}</div><span class="badge ${s.cls}">${s.label}</span>`;
      el.onclick = ()=>openDialog(c);
      grid.appendChild(el);
    });
  }
  render(chars);

  // 筛选 + 搜索
  let curFilter='all';
  document.querySelectorAll('.chip').forEach(ch=>ch.onclick=()=>{
    document.querySelectorAll('.chip').forEach(x=>x.classList.remove('is-active'));
    ch.classList.add('is-active'); curFilter=ch.dataset.filter; applyFilter();
  });
  document.getElementById('character-search').oninput = applyFilter;
  function applyFilter(){
    const q = document.getElementById('character-search').value.trim().toLowerCase();
    const list = chars.filter(c=>{
      const okF = curFilter==='all' || c.status===curFilter;
      const okQ = !q || c.hanzi.includes(q) || c.py.toLowerCase().includes(q) || c.en.toLowerCase().includes(q);
      return okF && okQ;
    });
    render(list);
  }

  // 弹窗
  const overlay=document.getElementById('detail-overlay');
  function openDialog(c){
    document.getElementById('detail-glyph').textContent=c.hanzi;
    document.getElementById('detail-title').textContent=c.hanzi;
    document.getElementById('detail-meta').textContent=`${c.py} · ${c.en} · ${c.strokes} 画 · 部首 ${c.radical}`;
    document.getElementById('stroke-glyph').textContent=c.hanzi;
    const sl=document.getElementById('stroke-list'); sl.innerHTML='';
    for(let i=1;i<=c.strokes;i++){const li=document.createElement('li');li.textContent=`第 ${i} 笔`;sl.appendChild(li);}
    const wl=document.getElementById('word-list'); wl.innerHTML='';
    c.words.forEach(w=>{const d=document.createElement('div');d.className='word-item';d.innerHTML=`<span class="w">${w.w}</span><span class="p">${w.p}</span><span class="e">${w.e}</span>`;wl.appendChild(d);});
    document.getElementById('example-box').innerHTML=`${c.example.s}<div class="py">${c.example.p}</div><div class="en">${c.example.e}</div>`;
    overlay.classList.add('open');
  }
  function closeDialog(){overlay.classList.remove('open');}
  document.getElementById('detail-close').onclick=closeDialog;
  overlay.onclick=(e)=>{if(e.target===overlay)closeDialog();};
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDialog();});
  document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('is-active'));
    document.querySelectorAll('.tab-panel').forEach(x=>x.classList.remove('is-active'));
    t.classList.add('is-active'); document.getElementById('tab-'+t.dataset.tab).classList.add('is-active');
  });
  document.getElementById('mark-learned').onclick=()=>{ showToast('已掌握', document.getElementById('detail-title').textContent+' 已加入已掌握列表'); };
  document.getElementById('practice-link').onclick=()=>{ closeDialog(); window.location.href='practice.html'; };

  // Toast
  const toast=document.getElementById('learn-toast'); let toastTimer;
  function showToast(title,msg){ document.getElementById('toast-title').textContent=title; document.getElementById('toast-message').textContent=msg; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),3000); }

  // 主题切换
  const tgl=document.getElementById('theme-toggle');
  tgl.onclick=()=>{ const d=document.documentElement.classList.toggle('dark'); localStorage.setItem('hm-theme',d?'dark':'light'); };
  if(localStorage.getItem('hm-theme')==='dark') document.documentElement.classList.add('dark');
