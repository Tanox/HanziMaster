// prototype/scripts/progress-part1.js v5.2.27 · JS part 1/1
  // 热力图：5 周 × 7 天 = 35 格
  const heat=document.getElementById('activity-heatmap');
  const levels=[0,1,2,3,4,2,1, 0,2,3,4,4,3,2, 1,2,3,4,2,1,0, 2,3,4,4,3,2,1, 0,1,2,3,4,2,0];
  levels.forEach(l=>{ const c=document.createElement('div'); c.className='cell'+(l?(' l'+l):''); heat.appendChild(c); });

  const tgl=document.getElementById('theme-toggle');
  tgl.onclick=()=>{ const d=document.documentElement.classList.toggle('dark'); localStorage.setItem('hm-theme',d?'dark':'light'); };
  if(localStorage.getItem('hm-theme')==='dark') document.documentElement.classList.add('dark');
