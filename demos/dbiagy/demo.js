/* Demonstração do Sistema D'Biagy.
   Tudo aqui é fictício e fica só na memória da página: não há servidor, banco,
   autenticação nem regra de negócio do sistema real. Recarregar volta ao início. */
(function(){
'use strict';

/* ---------------- utilidades ---------------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hoje=new Date();
const dataBR=d=>d.toLocaleDateString('pt-BR');
const hora=d=>d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
const diaRel=n=>{const d=new Date(hoje);d.setDate(d.getDate()+n);return d;};
const minAtras=m=>new Date(hoje.getTime()-m*60000);
const ico=p=>`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const ICON={
  grafico:'<path d="M3 3v18h18"/><path d="M7 15v-4M12 15V7M17 15v-6"/>',
  chave:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
  estoque:'<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>',
  escudo:'<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  planejar:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 13l2 2 4-4"/>',
  calendario:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  vistoria:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 11h6M9 15h4"/>',
  recepcao:'<path d="M3 12l9-9 9 9M5 10v10h14V10"/>',
  carrinho:'<circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.6 12.4a2 2 0 002 1.6h7.7a2 2 0 002-1.6L21 7H6"/>',
  servicos:'<path d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
  busca:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  mais:'<path d="M12 5v14M5 12h14"/>',
};
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2600);}

/* ---------------- dados fictícios ---------------- */
const UNIDADES=['Unidade Centro','Unidade Serra'];
const USUARIO='Ana Souza';
const equipe=[
  {nome:'Júlia Martins',ini:'JM',unidade:'Unidade Centro'},
  {nome:'Marta Lima',ini:'ML',unidade:'Unidade Centro'},
  {nome:'Rosa Pereira',ini:'RP',unidade:'Unidade Serra'},
  {nome:'Bianca Alves',ini:'BA',unidade:'Unidade Serra'},
];
const T=(quarto,tipo,status,obs)=>({quarto,tipo,status,obs:obs||''});
const tarefas={
  'Júlia Martins':[T('Apto 101','Saída','concluido'),T('Apto 102','Arrumação','concluido'),T('Apto 104','Saída','concluido'),T('Apto 105','Arrumação','pendente'),T('Apto 107','Revisão','pendente'),T('Recepção','Área comum','concluido')],
  'Marta Lima':[T('Apto 108','Saída','concluido'),T('Apto 109','Saída','naofeito','Hóspede pediu para não entrar'),T('Apto 110','Arrumação','concluido'),T('Apto 111','Arrumação','pendente'),T('Apto 112','Revisão','pendente')],
  'Rosa Pereira':[T('Chalé 01','Saída','concluido'),T('Chalé 02','Arrumação','concluido'),T('Chalé 04','Saída','concluido'),T('Chalé 05','Arrumação','concluido'),T('Salão de café','Área comum','pendente')],
  'Bianca Alves':[T('Chalé 06','Saída','pendente'),T('Chalé 07','Arrumação','concluido'),T('Chalé 08','Saída','pendente'),T('Chalé 09','Revisão','pendente'),T('Piscina','Área comum','concluido')],
};
let seqChamado=148;
const chamados=[
  {id:147,unidade:'Unidade Centro',setor:'Governança',local:'Apto 109',titulo:'Chuveiro sem aquecer',desc:'Água sai fria mesmo no máximo; hóspede chega às 14h.',prio:'critico',status:'aberto',por:'Marta Lima',quando:minAtras(25)},
  {id:146,unidade:'Unidade Serra',setor:'Recepção',local:'Chalé 03',titulo:'Fechadura eletrônica travando',desc:'Cartão precisa de duas tentativas para abrir.',prio:'atencao',status:'aberto',por:'Paulo Reis',quando:minAtras(70)},
  {id:145,unidade:'Unidade Centro',setor:'Cozinha',local:'Cozinha',titulo:'Coifa com barulho alto',desc:'Ruído começou ontem à noite.',prio:'info',status:'aberto',por:'Sônia Duarte',quando:minAtras(190)},
  {id:144,unidade:'Unidade Serra',setor:'Governança',local:'Chalé 06',titulo:'Ar-condicionado pingando',desc:'Pingando sobre a cômoda; toalha colocada embaixo.',prio:'atencao',status:'andamento',por:'Bianca Alves',quando:minAtras(260),resp:'Carlos Nunes'},
  {id:143,unidade:'Unidade Centro',setor:'Manutenção',local:'Área da piscina',titulo:'Troca de lâmpadas do deck',desc:'Três lâmpadas queimadas no caminho do deck.',prio:'info',status:'andamento',por:'Carlos Nunes',quando:minAtras(400),resp:'Carlos Nunes'},
  {id:142,unidade:'Unidade Centro',setor:'Governança',local:'Apto 104',titulo:'Descarga vazando',desc:'Resolvido com troca do reparo.',prio:'atencao',status:'concluido',por:'Júlia Martins',quando:minAtras(1500),resp:'Carlos Nunes'},
  {id:141,unidade:'Unidade Serra',setor:'Recepção',local:'Recepção',titulo:'Impressora fiscal sem papel',desc:'Bobina trocada.',prio:'info',status:'concluido',por:'Paulo Reis',quando:minAtras(1720),resp:'Carlos Nunes'},
  {id:139,unidade:'Unidade Serra',setor:'Governança',local:'Chalé 02',titulo:'Pintura da parede do banheiro',desc:'Aguardando reforma programada; fora do escopo do chamado.',prio:'info',status:'naoconcluido',por:'Rosa Pereira',quando:minAtras(4300),resp:'Carlos Nunes'},
];
let estoqueTipo='Governança';
const produtos=[
  // governança
  {tipo:'Governança',nome:'Papel higiênico folha dupla',cat:'Higiene',local:'Almoxarifado',un:'fardo',saldo:14,min:10,max:30},
  {tipo:'Governança',nome:'Sabonete líquido 5L',cat:'Amenities',local:'Almoxarifado',un:'galão',saldo:3,min:4,max:10},
  {tipo:'Governança',nome:'Shampoo sachê',cat:'Amenities',local:'Rouparia',un:'cx',saldo:22,min:8,max:30},
  {tipo:'Governança',nome:'Desinfetante 5L',cat:'Limpeza',local:'Almoxarifado',un:'galão',saldo:6,min:5,max:12},
  {tipo:'Governança',nome:'Saco de lixo 100L',cat:'Limpeza',local:'Almoxarifado',un:'pct',saldo:2,min:6,max:20},
  {tipo:'Governança',nome:'Toalha de banho',cat:'Enxoval',local:'Rouparia',un:'un',saldo:118,min:80,max:160},
  // cozinha
  {tipo:'Cozinha',nome:'Café em grãos 1kg',cat:'Café da manhã',local:'Despensa',un:'kg',saldo:9,min:6,max:20,val:diaRel(120)},
  {tipo:'Cozinha',nome:'Leite integral 1L',cat:'Laticínios',local:'Câmara fria',un:'cx',saldo:4,min:6,max:18,val:diaRel(5)},
  {tipo:'Cozinha',nome:'Queijo minas frescal',cat:'Laticínios',local:'Câmara fria',un:'kg',saldo:3,min:2,max:8,val:diaRel(2)},
  {tipo:'Cozinha',nome:'Geleia de morango',cat:'Café da manhã',local:'Despensa',un:'pote',saldo:16,min:8,max:24,val:diaRel(40)},
  {tipo:'Cozinha',nome:'Iogurte natural',cat:'Laticínios',local:'Câmara fria',un:'un',saldo:20,min:12,max:40,val:diaRel(-1)},
  {tipo:'Cozinha',nome:'Pão de forma',cat:'Padaria',local:'Despensa',un:'pct',saldo:7,min:4,max:12,val:diaRel(3)},
];
const movimentos=[
  {quando:minAtras(35),prod:'Saco de lixo 100L',tipo:'S',qtd:2,local:'Almoxarifado',quem:'Júlia Martins'},
  {quando:minAtras(80),prod:'Toalha de banho',tipo:'S',qtd:12,local:'Rouparia',quem:'Rosa Pereira'},
  {quando:minAtras(140),prod:'Leite integral 1L',tipo:'S',qtd:2,local:'Câmara fria',quem:'Sônia Duarte'},
  {quando:minAtras(300),prod:'Shampoo sachê',tipo:'E',qtd:10,local:'Rouparia',quem:'Ana Souza'},
  {quando:minAtras(1460),prod:'Café em grãos 1kg',tipo:'E',qtd:6,local:'Despensa',quem:'Ana Souza'},
  {quando:minAtras(1500),prod:'Desinfetante 5L',tipo:'S',qtd:1,local:'Almoxarifado',quem:'Marta Lima'},
];
const auditoria=[
  {quando:minAtras(12),quem:'Marta Lima',cargo:'camareira',acao:'Tarefa marcada como não feita',det:'Apto 109 · "Hóspede pediu para não entrar"'},
  {quando:minAtras(25),quem:'Marta Lima',cargo:'camareira',acao:'Chamado aberto',det:'#147 Chuveiro sem aquecer · Apto 109'},
  {quando:minAtras(35),quem:'Júlia Martins',cargo:'camareira',acao:'Saída de estoque',det:'Saco de lixo 100L · 2 pct'},
  {quando:minAtras(95),quem:'Carlos Nunes',cargo:'manutenção',acao:'Chamado iniciado',det:'#144 Ar-condicionado pingando'},
  {quando:minAtras(300),quem:'Ana Souza',cargo:'admin',acao:'Entrada de estoque',det:'Shampoo sachê · 10 cx'},
  {quando:minAtras(330),quem:'Ana Souza',cargo:'admin',acao:'Roteiro do dia publicado',det:'21 tarefas para 4 camareiras'},
  {quando:minAtras(610),quem:'Paulo Reis',cargo:'recepção',acao:'Login',det:'Acesso pelo celular'},
  {quando:minAtras(1500),quem:'Carlos Nunes',cargo:'manutenção',acao:'Chamado concluído',det:'#142 Descarga vazando'},
  {quando:minAtras(1520),quem:'Ana Souza',cargo:'admin',acao:'Permissão alterada',det:'Paulo Reis: acesso a Ocorrências'},
];
function registrar(acao,det){auditoria.unshift({quando:new Date(),quem:USUARIO,cargo:'admin',acao,det});}

/* ---------------- menu ---------------- */
const TELAS={
  acompanhamento:{rot:'Acompanhamento',ic:'grafico',grupo:'Governança'},
  manutencao:{rot:'Manutenção',ic:'chave',grupo:'Operação'},
  estoque:{rot:'Estoque',ic:'estoque',grupo:'Operação'},
  auditoria:{rot:'Auditoria',ic:'escudo',grupo:'Sistema'},
};
const FORA=[['Governança','Planejar','planejar'],['Governança','Vistoria','vistoria'],['Governança','Escala e Ponto','calendario'],['Operação','Recepção','recepcao'],['Operação','Compras','carrinho'],['Operação','Serviços & SPA','servicos']];
function montarMenu(){
  let h='';
  ['Governança','Operação','Sistema'].forEach(g=>{
    h+=`<p class="lat-g">${g}</p>`;
    Object.entries(TELAS).filter(([,t])=>t.grupo===g).forEach(([k,t])=>{h+=`<a class="lat-i" href="#${k}" data-tela="${k}">${ico(ICON[t.ic])}<span>${t.rot}</span></a>`;});
    FORA.filter(f=>f[0]===g).forEach(f=>{h+=`<button type="button" class="lat-i off" data-fora title="Disponível na versão completa">${ico(ICON[f[2]])}<span>${f[1]}</span></button>`;});
  });
  $('#menu').innerHTML=h;
  $('#menu').addEventListener('click',e=>{if(e.target.closest('[data-fora]'))toast('Esta tela existe no sistema real, mas não faz parte da demonstração.');});
}
function topo(tit,sub,acao,abas){
  $('#topo').innerHTML=`<div class="topo-linha"><div class="topo-tit"><h1>${tit}</h1><p>${sub}</p></div>${acao||''}</div>${abas?`<div class="abas" role="tablist">${abas}</div>`:'<div style="height:2px"></div>'}`;
}

/* ---------------- Acompanhamento ---------------- */
let filtroUnidAcomp='todas';
const SIT_TAREFA={pendente:['Pendente','atencao'],concluido:['Concluído','ok'],naofeito:['Não feito','critico']};
const PROX={pendente:'concluido',concluido:'naofeito',naofeito:'pendente'};
function telaAcompanhamento(){
  topo('Acompanhamento',`Situação das tarefas por funcionário · ${dataBR(hoje)}`,
    `<div class="seg" role="group" aria-label="Unidade">${['todas',...UNIDADES].map(u=>`<button type="button" data-u="${u}" aria-pressed="${u===filtroUnidAcomp}">${u==='todas'?'Todas':u.replace('Unidade ','')}</button>`).join('')}</div>`);
  const eq=equipe.filter(p=>filtroUnidAcomp==='todas'||p.unidade===filtroUnidAcomp);
  const todas=eq.flatMap(p=>tarefas[p.nome]);
  const c=s=>todas.filter(t=>t.status===s).length,pct=todas.length?Math.round(c('concluido')/todas.length*100):0;
  $('#conteudo').innerHTML=`
  <div class="stats">
    <div class="stat"><small>Tarefas do dia</small><b>${todas.length}</b><span>${eq.length} camareiras</span></div>
    <div class="stat"><small>Concluídas</small><b>${pct}%</b><div class="barra" style="margin-top:8px"><span style="width:${pct}%"></span></div></div>
    <div class="stat"><small>Pendentes</small><b>${c('pendente')}</b><span>em andamento agora</span></div>
    <div class="stat"><small>Não feitas</small><b style="color:var(--critico)">${c('naofeito')}</b><span>com justificativa</span></div>
  </div>
  <div class="legenda"><span class="sit sit-atencao">Pendente</span><span class="sit sit-ok">Concluído</span><span class="sit sit-critico">Não feito</span><span style="font-size:12.5px;color:var(--tinta-3)">Clique numa tarefa para mudar a situação</span></div>
  <div class="kb">${eq.map(p=>{const ts=tarefas[p.nome],ok=ts.filter(t=>t.status==='concluido').length;return `
    <section class="kb-col">
      <div class="kb-tit"><div class="quem"><span class="av" style="background:var(--verde-100);color:var(--verde)">${p.ini}</span><div><b>${p.nome}</b><small>${p.unidade}</small></div></div><span class="kb-n">${ok}/${ts.length}</span></div>
      <div class="kb-prog"><div class="barra"><span style="width:${Math.round(ok/ts.length*100)}%"></span></div></div>
      <div class="kb-corpo">${ts.map((t,i)=>{const [r,k]=SIT_TAREFA[t.status];return `
        <article class="tk tarefa tk-${k}" data-p="${esc(p.nome)}" data-i="${i}" tabindex="0" role="button" aria-label="${esc(t.quarto)}: ${r}">
          <div class="tk-topo"><span class="sit sit-${k}">${r}</span></div>
          <div class="tk-rot">${esc(t.tipo)}</div><div class="tk-forte">${esc(t.quarto)}</div>
          ${t.obs?`<div class="tk-txt">“${esc(t.obs)}”</div>`:''}
        </article>`;}).join('')}</div>
    </section>`;}).join('')}</div>`;
}
function cliqueAcomp(e){
  const u=e.target.closest('[data-u]');if(u){filtroUnidAcomp=u.dataset.u;return telaAcompanhamento();}
  const tk=e.target.closest('.tarefa');if(!tk)return;
  const t=tarefas[tk.dataset.p][+tk.dataset.i];t.status=PROX[t.status];
  if(t.status==='naofeito')t.obs='Justificativa registrada na demo';else if(t.status==='pendente')t.obs='';
  registrar('Situação de tarefa alterada',`${t.quarto} · ${SIT_TAREFA[t.status][0]}`);
  telaAcompanhamento();
}

/* ---------------- Manutenção ---------------- */
const COLS=[['aberto','Abertos','critico'],['andamento','Em andamento','atencao'],['concluido','Concluídos','ok'],['naoconcluido','Não concluídos','neutro']];
const PRIO={critico:'Urgente',atencao:'Importante',info:'Normal'};
let fMan={unid:'todas',setor:'todos',q:''};
function telaManutencao(){
  topo('Manutenção','Chamados de conserto e reparo',`<button type="button" class="b b-1" data-novo>${ico(ICON.mais)}Novo chamado</button>`);
  const setores=[...new Set(chamados.map(c=>c.setor))].sort();
  $('#conteudo').innerHTML=`
  <div class="fbar">
    <div class="fg"><label for="fUnid">Unidade</label><select id="fUnid"><option value="todas">Todas</option>${UNIDADES.map(u=>`<option ${fMan.unid===u?'selected':''}>${u}</option>`).join('')}</select></div>
    <div class="fg"><label for="fSetor">Setor</label><select id="fSetor"><option value="todos">Todos</option>${setores.map(s=>`<option ${fMan.setor===s?'selected':''}>${s}</option>`).join('')}</select></div>
    <div class="busca">${ico(ICON.busca)}<input id="fBusca" type="search" placeholder="Buscar chamado" value="${esc(fMan.q)}" aria-label="Buscar chamado"></div>
  </div>
  <div class="kb" id="quadro"></div>`;
  desenharQuadro();
}
function desenharQuadro(){
  const q=fMan.q.toLowerCase();
  const lista=chamados.filter(c=>(fMan.unid==='todas'||c.unidade===fMan.unid)&&(fMan.setor==='todos'||c.setor===fMan.setor)&&(!q||(c.titulo+c.local+c.desc+c.id).toLowerCase().includes(q)));
  $('#quadro').innerHTML=COLS.map(([st,rot,k])=>{const cs=lista.filter(c=>c.status===st);return `
    <section class="kb-col"><div class="kb-tit"><span class="sit sit-${k}">${rot}</span><span class="kb-n">${cs.length}</span></div>
    <div class="kb-corpo">${cs.map(c=>`
      <article class="tk tk-${st==='concluido'?'ok':st==='naoconcluido'?'neutro':c.prio}">
        <div class="tk-topo"><span class="sit sit-${c.prio==='critico'&&st==='aberto'?'critico':c.prio==='atencao'?'atencao':'neutro'}">${PRIO[c.prio]}</span><span class="tk-id">#${c.id}</span></div>
        <div class="tk-rot">${esc(c.unidade)} · ${esc(c.local)}</div>
        <div class="tk-forte">${esc(c.titulo)}</div>
        <div class="tk-txt">${esc(c.desc)}</div>
        ${st==='aberto'?`<div class="tk-acoes"><button type="button" class="b b-1" data-mover="${c.id}" data-para="andamento">Iniciar</button></div>`:''}
        ${st==='andamento'?`<div class="tk-acoes"><button type="button" class="b b-1" data-mover="${c.id}" data-para="concluido">Concluir</button><button type="button" class="b b-2" data-mover="${c.id}" data-para="naoconcluido">Não concluído</button></div>`:''}
        <div class="tk-pe"><span>${esc(c.setor)} · ${esc(c.por)}</span><span>${c.quando.toDateString()===hoje.toDateString()?'hoje '+hora(c.quando):dataBR(c.quando)}</span></div>
      </article>`).join('')}</div></section>`;}).join('');
}
function cliqueMan(e){
  if(e.target.closest('[data-novo]'))return abrirNovoChamado();
  const m=e.target.closest('[data-mover]');if(!m)return;
  const c=chamados.find(x=>x.id===+m.dataset.mover);c.status=m.dataset.para;c.resp=USUARIO;
  const rot={andamento:'Chamado iniciado',concluido:'Chamado concluído',naoconcluido:'Chamado encerrado sem conclusão'}[c.status];
  registrar(rot,`#${c.id} ${c.titulo}`);toast(`${rot}: #${c.id}`);desenharQuadro();
}
function abrirNovoChamado(){
  abrirModal('Novo chamado',`
    <div class="linha2">
      <div class="campo"><label for="nUnid">Unidade</label><select id="nUnid">${UNIDADES.map(u=>`<option>${u}</option>`).join('')}</select></div>
      <div class="campo"><label for="nSetor">Setor</label><select id="nSetor">${['Governança','Recepção','Cozinha','Manutenção','Administrativo'].map(s=>`<option>${s}</option>`).join('')}</select></div>
    </div>
    <div class="linha2">
      <div class="campo"><label for="nLocal">Local</label><input id="nLocal" required placeholder="Ex.: Apto 203"></div>
      <div class="campo"><label for="nPrio">Prioridade</label><select id="nPrio"><option value="info">Normal</option><option value="atencao">Importante</option><option value="critico">Urgente</option></select></div>
    </div>
    <div class="campo"><label for="nTit">O que aconteceu?</label><input id="nTit" required placeholder="Ex.: Torneira pingando"></div>
    <div class="campo"><label for="nDesc">Detalhes</label><textarea id="nDesc" rows="3" placeholder="Opcional"></textarea></div>`,
  'Abrir chamado',()=>{
    const c={id:++seqChamado,unidade:$('#nUnid').value,setor:$('#nSetor').value,local:$('#nLocal').value.trim(),titulo:$('#nTit').value.trim(),desc:$('#nDesc').value.trim()||'Sem detalhes.',prio:$('#nPrio').value,status:'aberto',por:USUARIO,quando:new Date()};
    chamados.unshift(c);registrar('Chamado aberto',`#${c.id} ${c.titulo} · ${c.local}`);fMan={unid:'todas',setor:'todos',q:''};telaManutencao();toast(`Chamado #${c.id} aberto`);
  });
}

/* ---------------- Estoque ---------------- */
let abaEst='produtos';
function telaEstoque(){
  topo('Estoque','Produtos, entradas, saídas e vencimentos',
    `<button type="button" class="b b-1" data-mov>${ico(ICON.mais)}Registrar movimentação</button>`,
    [['produtos','Produtos'],['movimentos','Entradas / Saídas'],['vencimentos','Vencimentos']].map(([k,r])=>`<button type="button" role="tab" data-aba="${k}" aria-selected="${abaEst===k}">${r}</button>`).join(''));
  const seg=`<div class="seg" role="group" aria-label="Estoque" style="margin-bottom:14px">${['Governança','Cozinha'].map(t=>`<button type="button" data-tipo="${t}" aria-pressed="${estoqueTipo===t}">${t}</button>`).join('')}</div>`;
  const ps=produtos.filter(p=>p.tipo===estoqueTipo);
  let h=seg;
  if(abaEst==='produtos'){
    const baixos=ps.filter(p=>p.saldo<p.min);
    h+=baixos.length?`<div class="aviso aviso-atencao">${ico('<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/>')}${baixos.length} ${baixos.length>1?'produtos abaixo':'produto abaixo'} do estoque mínimo: ${baixos.map(p=>esc(p.nome)).join(', ')}</div>`:`<div class="aviso aviso-ok">Todos os produtos acima do mínimo.</div>`;
    h+=`<div class="tabela"><div class="rola"><table><thead><tr><th>Produto</th><th>Categoria</th><th>Local</th><th>Saldo</th><th class="num">Mínimo</th><th>Situação</th></tr></thead><tbody>${ps.map(p=>{
      const pct=Math.min(100,Math.round(p.saldo/p.max*100)),baixo=p.saldo<p.min;
      return `<tr><td><b>${esc(p.nome)}</b></td><td><span class="chip">${esc(p.cat)}</span></td><td>${esc(p.local)}</td>
      <td><div class="saldo"><div class="barra"><span style="width:${pct}%;background:${baixo?'var(--critico)':'var(--verde)'}"></span></div><b>${p.saldo} ${p.un}</b></div></td>
      <td class="num">${p.min}</td><td>${baixo?'<span class="sit sit-critico">Repor</span>':'<span class="sit sit-ok">Ok</span>'}</td></tr>`;}).join('')}</tbody></table></div></div>`;
  }else if(abaEst==='movimentos'){
    const ms=movimentos.filter(m=>ps.some(p=>p.nome===m.prod));
    h+=`<div class="tabela"><div class="rola"><table><thead><tr><th>Data/Hora</th><th>Produto</th><th>Tipo</th><th class="num">Qtd</th><th>Local</th><th>Usuário</th></tr></thead><tbody>${ms.length?ms.map(m=>`
      <tr><td class="mono">${dataBR(m.quando)} ${hora(m.quando)}</td><td><b>${esc(m.prod)}</b></td><td class="${m.tipo==='E'?'tipo-e':'tipo-s'}">${m.tipo==='E'?'Entrada':'Saída'}</td><td class="num">${m.qtd}</td><td>${esc(m.local)}</td><td>${esc(m.quem)}</td></tr>`).join(''):'<tr><td colspan="6" style="text-align:center;color:var(--tinta-3)">Nenhuma movimentação</td></tr>'}</tbody></table></div></div>`;
  }else{
    const vs=ps.filter(p=>p.val).sort((a,b)=>a.val-b.val);
    h+=vs.length?`<div class="tabela"><div class="rola"><table><thead><tr><th>Produto</th><th>Validade</th><th class="num">Saldo</th><th>Situação</th></tr></thead><tbody>${vs.map(p=>{
      const d=Math.ceil((p.val-hoje)/864e5),s=d<0?['Vencido','critico']:d<=3?[`Vence em ${d} dia${d===1?'':'s'}`,'atencao']:d<=7?[`${d} dias`,'info']:[`${d} dias`,'ok'];
      return `<tr><td><b>${esc(p.nome)}</b></td><td class="mono">${dataBR(p.val)}</td><td class="num">${p.saldo} ${p.un}</td><td><span class="sit sit-${s[1]}">${s[0]}</span></td></tr>`;}).join('')}</tbody></table></div></div>`
      :`<div class="card" style="color:var(--tinta-2)">Os produtos de governança não têm controle de validade. Troque para <b>Cozinha</b> para ver os vencimentos.</div>`;
  }
  $('#conteudo').innerHTML=h;
}
function cliqueEst(e){
  const a=e.target.closest('[data-aba]');if(a){abaEst=a.dataset.aba;return telaEstoque();}
  const t=e.target.closest('[data-tipo]');if(t){estoqueTipo=t.dataset.tipo;return telaEstoque();}
  if(e.target.closest('[data-mov]'))abrirMov();
}
function abrirMov(){
  const ps=produtos.filter(p=>p.tipo===estoqueTipo);
  abrirModal('Registrar movimentação',`
    <div class="campo"><label for="mProd">Produto (${estoqueTipo})</label><select id="mProd">${ps.map((p,i)=>`<option value="${i}">${esc(p.nome)} — saldo ${p.saldo} ${p.un}</option>`).join('')}</select></div>
    <div class="linha2">
      <div class="campo"><label for="mTipo">Tipo</label><select id="mTipo"><option value="S">Saída</option><option value="E">Entrada</option></select></div>
      <div class="campo"><label for="mQtd">Quantidade</label><input id="mQtd" type="number" min="1" value="1" required inputmode="numeric"></div>
    </div>`,
  'Registrar',()=>{
    const p=ps[+$('#mProd').value],tipo=$('#mTipo').value,q=Math.max(1,+$('#mQtd').value||1);
    if(tipo==='S'&&q>p.saldo){toast(`Saldo insuficiente: há ${p.saldo} ${p.un}`);return false;}
    p.saldo+=tipo==='E'?q:-q;
    movimentos.unshift({quando:new Date(),prod:p.nome,tipo,qtd:q,local:p.local,quem:USUARIO});
    registrar(tipo==='E'?'Entrada de estoque':'Saída de estoque',`${p.nome} · ${q} ${p.un}`);
    toast(`${tipo==='E'?'Entrada':'Saída'} registrada: ${p.nome}`);telaEstoque();
  });
}

/* ---------------- Auditoria ---------------- */
function telaAuditoria(){
  topo('Auditoria','Histórico de ações dos usuários — cada alteração fica registrada com autor e horário');
  $('#conteudo').innerHTML=`
  <div class="aviso aviso-ok">${ico(ICON.escudo)}As ações que você fizer nesta demonstração aparecem aqui no topo da lista.</div>
  <div class="tabela"><div class="rola"><table><thead><tr><th>Quando</th><th>Usuário</th><th>Cargo</th><th>Ação</th><th>Detalhe</th></tr></thead><tbody>${auditoria.map(a=>`
    <tr><td class="mono">${a.quando.toDateString()===hoje.toDateString()?'hoje '+hora(a.quando):dataBR(a.quando)+' '+hora(a.quando)}</td><td><b>${esc(a.quem)}</b></td><td><span class="chip">${esc(a.cargo)}</span></td><td>${esc(a.acao)}</td><td style="color:var(--tinta-2)">${esc(a.det)}</td></tr>`).join('')}</tbody></table></div></div>`;
}

/* ---------------- modal ---------------- */
let aoSalvar=null;
function abrirModal(tit,corpo,rotulo,fn){
  aoSalvar=fn;
  $('#modal').innerHTML=`<div class="modal-topo"><h3 id="modalTit">${tit}</h3><button type="button" data-fechar aria-label="Fechar">✕</button></div>
    <div class="modal-corpo">${corpo}</div>
    <div class="modal-pe"><button type="button" class="b b-2" data-fechar>Cancelar</button><button type="submit" class="b b-1">${rotulo}</button></div>`;
  $('#veu').classList.add('aberto');
  setTimeout(()=>{const f=$('#modal').querySelector('input,select');f&&f.focus();},30);
}
function fecharModal(){$('#veu').classList.remove('aberto');aoSalvar=null;}
$('#modal').addEventListener('submit',e=>{e.preventDefault();if(aoSalvar&&aoSalvar()!==false)fecharModal();});
$('#veu').addEventListener('click',e=>{if(e.target.id==='veu'||e.target.closest('[data-fechar]'))fecharModal();});
addEventListener('keydown',e=>{if(e.key==='Escape')fecharModal();});

/* ---------------- roteamento ---------------- */
const RENDER={acompanhamento:telaAcompanhamento,manutencao:telaManutencao,estoque:telaEstoque,auditoria:telaAuditoria};
const CLIQUE={acompanhamento:cliqueAcomp,manutencao:cliqueMan,estoque:cliqueEst};
let atual;
function ir(){
  atual=RENDER[location.hash.slice(1)]?location.hash.slice(1):'acompanhamento';
  document.querySelectorAll('[data-tela]').forEach(a=>a.dataset.tela===atual?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  RENDER[atual]();scrollTo(0,0);
}
document.addEventListener('click',e=>{if(e.target.closest('#topo,#conteudo')&&CLIQUE[atual])CLIQUE[atual](e);});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('tarefa')){e.preventDefault();cliqueAcomp(e);}});
document.addEventListener('change',e=>{
  if(atual!=='manutencao')return;
  if(e.target.id==='fUnid'){fMan.unid=e.target.value;desenharQuadro();}
  if(e.target.id==='fSetor'){fMan.setor=e.target.value;desenharQuadro();}
});
document.addEventListener('input',e=>{if(e.target.id==='fBusca'){fMan.q=e.target.value;desenharQuadro();}});
addEventListener('hashchange',ir);
montarMenu();ir();
})();
