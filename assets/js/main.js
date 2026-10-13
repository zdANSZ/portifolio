(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css=k=>getComputedStyle(document.documentElement).getPropertyValue(k).trim();

  /* ---------- brilho que segue o cursor ---------- */
  function follow(el,xv,yv){el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty(xv,(e.clientX-r.left)+'px');el.style.setProperty(yv,(e.clientY-r.top)+'px');});}
  follow(document.getElementById('contato'),'--gx','--gy');

  /* ---------- cards de projetos (dados em projects.js) ---------- */
  const projects=document.getElementById('projects');
  let filter='all';
  function applyFilter(){projects.querySelectorAll('.card').forEach(c=>{c.hidden=!(filter==='all'||c.dataset.s===filter)});}
  function renderProjects(lang){
    projects.innerHTML=window.PROJECTS.map(base=>{
      const p=lang==='en'&&base.en?{...base,...base.en,link:{...base.link,...base.en.link}}:base;
      return `
    <article class="card${p.wide?' wide':''}" data-s="${p.filter}" style="--c:var(--${p.color})">
      <div class="shot">${p.image?`<a class="win win-img" href="${p.demo||p.link.href||p.image}"${!p.demo&&p.link.href?' target="_blank" rel="noopener"':''} tabindex="-1" aria-hidden="true"><img src="${p.image}" alt="" loading="lazy" decoding="async"></a>`:p.shot}</div>
      <div class="body">
        <div class="top"><h3>${p.title}</h3><span class="status${p.statusKind?' '+p.statusKind:''}">${p.status}</span></div>
        <p>${p.desc}</p>
        <div class="chips">${p.chips.map(c=>`<span>${c}</span>`).join('')}</div>
        <div class="links">${p.demo?`<a href="${p.demo}">${lang==='en'?EN['cta.demo']:'Ver demo interativa'} <span aria-hidden="true">↗</span></a>`:''}${p.link.href?`<a href="${p.link.href}" target="_blank" rel="noopener">${p.link.text} <span aria-hidden="true">↗</span></a>`:`<span>${p.link.text}</span>`}</div>
      </div>
    </article>`;}).join('');
    projects.querySelectorAll('.card').forEach(c=>follow(c,'--mx','--my'));
    applyFilter();
  }

  /* ---------- filtros de projetos ---------- */
  const fb=document.querySelectorAll('.filters button');
  fb.forEach(b=>b.addEventListener('click',()=>{
    fb.forEach(x=>x.setAttribute('aria-pressed',x===b));
    filter=b.dataset.f;applyFilter();
  }));

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
    el.innerHTML=`<div class="num"><span>${String(i+1).padStart(2,'0')}</span><i></i></div><div class="ico" aria-hidden="true">${DEVICONS[s]||GENERIC[s]||''}</div><div class="name" data-i18n="tech.${s}">${n}</div>`;
    follow(el,'--mx','--my');tiles.appendChild(el);
  });
  Object.entries(groups).forEach(([k,[label,c]])=>{
    const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.i18n='group.'+k;b.style.setProperty('--c',c);b.setAttribute('aria-pressed','false');
    b.addEventListener('click',()=>{
      const on=b.getAttribute('aria-pressed')!=='true';
      legend.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));
      b.setAttribute('aria-pressed',on);
      tiles.querySelectorAll('.tile').forEach(t=>t.classList.toggle('dim',on&&t.dataset.g!==k));
    });
    legend.appendChild(b);
  });

  /* ---------- idioma (traduções em i18n.js) ----------
     PT é o texto original do HTML; na primeira troca ele é guardado para poder voltar.
     Ordem de escolha: ?lang= na URL, escolha salva, idioma do navegador. */
  const EN=window.I18N_EN,orig=new WeakMap(),origAria=new WeakMap();
  const meta=document.querySelector('meta[name="description"]'),metaPT=meta.content;
  function setLang(lang){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      if(!orig.has(el))orig.set(el,el.innerHTML);
      const t=lang==='en'?EN[el.dataset.i18n]:undefined;
      el.innerHTML=t!==undefined?t:orig.get(el);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el=>{
      if(!el.dataset.altPt)el.dataset.altPt=el.alt;
      el.alt=lang==='en'?EN[el.dataset.i18nAlt]:el.dataset.altPt;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el=>{
      if(!origAria.has(el))origAria.set(el,el.getAttribute('aria-label'));
      el.setAttribute('aria-label',lang==='en'?EN[el.dataset.i18nAria]:origAria.get(el));
    });
    meta.content=lang==='en'?EN['meta.description']:metaPT;
    document.documentElement.lang=lang==='en'?'en':'pt-BR';
    document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===lang));
    renderProjects(lang);
  }
  let saved=null;
  try{saved=localStorage.getItem('lang')}catch(e){}
  const q=new URLSearchParams(location.search).get('lang');
  const start=['pt','en'].includes(q)?q:['pt','en'].includes(saved)?saved:(/^pt\b/i.test(navigator.language||'pt')?'pt':'en');
  setLang(start);
  document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>{
    setLang(b.dataset.lang);
    try{localStorage.setItem('lang',b.dataset.lang)}catch(e){}
  }));

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
