(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css=k=>getComputedStyle(document.documentElement).getPropertyValue(k).trim();

  /* ---------- filtros de projetos ---------- */
  const fb=document.querySelectorAll('.filters button');
  fb.forEach(b=>b.addEventListener('click',()=>{
    fb.forEach(x=>x.setAttribute('aria-pressed',x===b));
    const f=b.dataset.f;
    document.querySelectorAll('#projects .card').forEach(c=>{c.hidden=!(f==='all'||c.dataset.s===f)});
  }));

  /* ---------- brilho que segue o cursor ---------- */
  function follow(el,xv,yv){el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty(xv,(e.clientX-r.left)+'px');el.style.setProperty(yv,(e.clientY-r.top)+'px');});}
  document.querySelectorAll('.card').forEach(c=>follow(c,'--mx','--my'));
  follow(document.getElementById('contato'),'--gx','--gy');

  /* ---------- stack (ícones em icons.js) ---------- */
  const {DEVICONS,GENERIC}=window;
  const groups={back:['Back-end','var(--node)'],front:['Front-end','var(--accent)'],data:['Dados','var(--c-data)'],infra:['DevOps e Cloud','var(--c-infra)'],more:['Práticas','var(--c-ai)']};
  const techs=[
    ['java','Java','back'],['spring','Spring Boot','back'],['nodejs','Node.js','back'],['python','Python','back'],['php','PHP','back'],
    ['typescript','TypeScript','front'],['javascript','JavaScript','front'],['angular','Angular','front'],['tailwindcss','Tailwind CSS','front'],['html5','HTML e CSS','front'],
    ['postgresql','PostgreSQL','data'],['sqlserver','SQL Server','data'],['mysql','MySQL','data'],['mongodb','MongoDB','data'],['supabase','Supabase','data'],
    ['linux','Linux','infra'],['docker','Docker','infra'],['nginx','Nginx','infra'],['oracle','Oracle Cloud','infra'],['git','Git','infra'],
    ['api','APIs REST','more'],['jwt','JWT / OAuth','more'],['sec','RLS e segurança','more'],['tst','Testes automatizados','more'],['ai','Orquestração de IA','more'],
  ];
  const tiles=document.getElementById('tiles'),legend=document.getElementById('legend');
  techs.forEach(([s,n,g],i)=>{
    const el=document.createElement('div');el.className='tile';el.dataset.g=g;el.style.setProperty('--c',groups[g][1]);
    el.innerHTML=`<div class="num"><span>${String(i+1).padStart(2,'0')}</span><i></i></div><div class="ico" aria-hidden="true">${DEVICONS[s]||GENERIC[s]||''}</div><div class="name">${n}</div>`;
    follow(el,'--mx','--my');tiles.appendChild(el);
  });
  Object.entries(groups).forEach(([k,[label,c]])=>{
    const b=document.createElement('button');b.type='button';b.textContent=label;b.style.setProperty('--c',c);b.setAttribute('aria-pressed','false');
    b.addEventListener('click',()=>{
      const on=b.getAttribute('aria-pressed')!=='true';
      legend.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));
      b.setAttribute('aria-pressed',on);
      tiles.querySelectorAll('.tile').forEach(t=>t.classList.toggle('dim',on&&t.dataset.g!==k));
    });
    legend.appendChild(b);
  });

  /* ---------- campo de pontos do hero ---------- */
  const cv=document.getElementById('field'),ctx=cv.getContext('2d'),hero=cv.parentElement;
  let W,H,dpr,fg,ac,mouse={x:-9e3,y:-9e3,tx:-9e3,ty:-9e3},t0=performance.now();
  const COLS=64,ROWS=34;
  function resize(){dpr=Math.min(devicePixelRatio||1,2);W=hero.clientWidth;H=hero.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);fg=css('--fg');ac=css('--accent');}
  hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();mouse.tx=e.clientX-r.left;mouse.ty=e.clientY-r.top;});
  hero.addEventListener('pointerleave',()=>{mouse.tx=mouse.ty=-9e3;});
  function frame(now){
    const t=(now-t0)/1000;
    mouse.x+= (mouse.tx-mouse.x)*.08; mouse.y+=(mouse.ty-mouse.y)*.08;
    ctx.clearRect(0,0,W,H);
    const cx=W*.62,horizon=H*.18,fov=W*.9;
    for(let j=0;j<ROWS;j++){
      const z=1+j*.42;                         // profundidade
      for(let i=0;i<COLS;i++){
        const x=(i/(COLS-1)-.5)*14;
        const wave=Math.sin(x*.55+t*.7)*.55+Math.cos(z*.6-t*.5)*.45+Math.sin((x+z)*.3+t*.35)*.35;
        let sx=cx+x/z*fov*.18, sy=horizon+(2.6-wave*.5)/z*fov*.2;
        const dx=sx-mouse.x,dy=sy-mouse.y,d=Math.hypot(dx,dy),inf=Math.max(0,1-d/160);
        sy-=inf*18*Math.sin(d*.06-t*4);
        if(sx<-10||sx>W+10||sy<-10||sy>H+10)continue;
        const depth=1-j/ROWS, r=.5+depth*1.3+inf*1.2;
        ctx.globalAlpha=(.08+depth*.5)*(.55+wave*.25)+inf*.5;
        ctx.fillStyle=inf>.15?ac:fg;
        ctx.beginPath();ctx.arc(sx,sy,r,0,6.283);ctx.fill();
      }
    }
    ctx.globalAlpha=1;
    if(!reduce)requestAnimationFrame(frame);
  }
  addEventListener('resize',()=>{resize();if(reduce)frame(performance.now());});
  resize();requestAnimationFrame(frame);
})();
