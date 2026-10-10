/* Projetos da seção "Trabalho selecionado", na ordem em que aparecem.
   title, status   título e selo do card
   statusKind      cor do selo: omitido = verde, "dev" = laranja, "acad" = azul
   filter          botão de filtro: "sys" (Sistemas), "infra" (Infraestrutura), "study" (Estudos e pessoais)
   color           variável de cor do card: node, accent, c-data, c-infra, c-ai
   wide            ocupa duas colunas na grade
   link            {text} vira rótulo; {text, href} vira link externo
   shot            miniatura decorativa (HTML com blocos .sk) mostrada no topo do card */
window.PROJECTS=[
  {
    title: "Sistema D'Biagy",
    status: "Em produção",
    filter: "sys",
    color: "node",
    wide: true,
    desc: "Sistema de gestão operacional de uma rede de pousadas, usado diariamente pelos setores de governança, manutenção, compras e estoque. Inclui autenticação com acesso por cargo, trilha de auditoria, upload de documentos e testes automatizados da API.",
    chips: ["PHP", "JavaScript", "PostgreSQL", "Supabase", "Tailwind"],
    link: {text: "Uso interno"},
    shot: `
      <div class="win">
        <div class="row" style="height:100%">
          <div class="col" style="flex:.28"><div class="sk c" style="height:10px;width:70%"></div><div class="sk" style="height:8px"></div><div class="sk" style="height:8px;width:80%"></div><div class="sk" style="height:8px;width:60%"></div><div class="sk" style="height:8px;width:75%"></div></div>
          <div class="col"><div class="sk" style="height:10px;width:40%"></div><div class="sk" style="height:34px"></div><div class="sk c" style="height:34px;opacity:.6"></div><div class="sk" style="height:34px"></div></div>
          <div class="col"><div class="sk" style="height:10px;width:40%"></div><div class="sk" style="height:34px"></div><div class="sk" style="height:34px"></div></div>
          <div class="col"><div class="sk" style="height:10px;width:40%"></div><div class="sk c" style="height:34px;opacity:.35"></div></div>
        </div>
      </div>`,
  },
  {
    title: "Automação WhatsApp",
    status: "Em produção",
    filter: "sys",
    color: "c-ai",
    desc: "Serviço em Node.js integrado ao sistema de gestão que envia tarefas, alertas e relatórios às equipes, com painel web para agendar e controlar os envios.",
    chips: ["Node.js", "Baileys", "Cron"],
    link: {text: "Uso interno"},
    shot: `
      <div class="win">
        <div class="col">
          <div class="sk" style="height:22px;width:62%;border-radius:10px 10px 10px 2px"></div>
          <div class="sk c" style="height:22px;width:54%;align-self:flex-end;border-radius:10px 10px 2px 10px;opacity:.55"></div>
          <div class="sk" style="height:22px;width:70%;border-radius:10px 10px 10px 2px"></div>
          <div class="sk c" style="height:22px;width:40%;align-self:flex-end;border-radius:10px 10px 2px 10px;opacity:.55"></div>
        </div>
      </div>`,
  },
  {
    title: "Zapedix",
    status: "MVP",
    statusKind: "dev",
    filter: "sys",
    color: "accent",
    wide: true,
    desc: "SaaS multi-tenant de cardápio digital: o pedido chega pronto no WhatsApp da loja. Painel com crediário, faturamento e catálogo, com isolamento de dados por cliente e suíte de testes de permissão.",
    chips: ["PostgreSQL", "Supabase", "Node.js", "Chart.js"],
    link: {text: "Em desenvolvimento"},
    shot: `
      <div class="win">
        <div class="row" style="flex-wrap:wrap;gap:8px">
          <div class="col" style="flex:1 1 40%"><div class="sk" style="height:40px"></div><div class="sk" style="height:7px;width:70%"></div></div>
          <div class="col" style="flex:1 1 40%"><div class="sk" style="height:40px"></div><div class="sk" style="height:7px;width:55%"></div></div>
          <div class="sk c" style="height:18px;flex:1 1 100%;opacity:.7"></div>
        </div>
      </div>`,
  },
  {
    title: "Sr. Enxoval",
    status: "No ar",
    filter: "sys",
    color: "c-infra",
    desc: "Site de locação de enxoval com catálogo, cálculo de diárias e pedido pelo WhatsApp. O painel administrativo gera um catálogo em PDF.",
    chips: ["Vite", "JavaScript", "Supabase"],
    link: {text: "srenxoval.com.br", href: "https://srenxoval.com.br"},
    shot: `
      <div class="win">
        <div class="sk" style="height:46px;margin-bottom:8px"></div>
        <div class="row"><div class="sk" style="height:34px;flex:1"></div><div class="sk" style="height:34px;flex:1"></div><div class="sk c" style="height:34px;flex:1;opacity:.5"></div></div>
      </div>`,
  },
  {
    title: "Estoque, CMV e Metas",
    status: "Em uso",
    filter: "sys",
    color: "c-data",
    desc: "SPA para um restaurante controlar estoque, compras e custo da mercadoria vendida, com leitor de código de barras e painel de indicadores com metas diárias, semanais e mensais.",
    chips: ["JavaScript", "Supabase", "PostgreSQL"],
    link: {text: "Uso interno"},
    shot: `
      <div class="win">
        <div class="row" style="align-items:flex-end;height:70px;gap:6px">
          <div class="sk" style="height:40%;flex:1"></div><div class="sk" style="height:65%;flex:1"></div><div class="sk c" style="height:90%;flex:1;opacity:.6"></div><div class="sk" style="height:55%;flex:1"></div><div class="sk" style="height:75%;flex:1"></div><div class="sk" style="height:50%;flex:1"></div>
        </div>
        <div class="sk" style="height:8px;margin-top:10px;width:60%"></div>
      </div>`,
  },
  {
    title: "Infraestrutura em nuvem",
    status: "Em produção",
    filter: "infra",
    color: "c-infra",
    wide: true,
    desc: "Montei e administro o servidor Linux na Oracle Cloud que hospeda os sistemas web, o serviço de WhatsApp, a plataforma Zapedix e automações em Python. Configurei Nginx e PHP-FPM, processos Node com PM2, deploy via Git com chaves SSH dedicadas, rotina de manutenção agendada com alerta automático e recuperação de incidentes em produção.",
    chips: ["Linux (Ubuntu)", "Oracle Cloud", "Nginx", "PM2", "Bash", "Git"],
    link: {text: "Infraestrutura própria"},
    shot: `
      <div class="win" style="font:11px/1.9 var(--mono);color:var(--dim)">
        <div class="row" style="align-items:center"><span style="color:var(--node)">●</span><div class="sk" style="height:7px;width:22%"></div><div class="sk" style="height:7px;width:12%"></div><span style="margin-left:auto;color:var(--node)">online</span></div>
        <div class="row" style="align-items:center"><span style="color:var(--node)">●</span><div class="sk" style="height:7px;width:30%"></div><div class="sk" style="height:7px;width:10%"></div><span style="margin-left:auto;color:var(--node)">online</span></div>
        <div class="row" style="align-items:center"><span style="color:var(--node)">●</span><div class="sk" style="height:7px;width:18%"></div><div class="sk" style="height:7px;width:14%"></div><span style="margin-left:auto;color:var(--node)">online</span></div>
        <div class="row" style="align-items:center"><span style="color:var(--accent)">●</span><div class="sk c" style="height:7px;width:26%;opacity:.6"></div><span style="margin-left:auto">cron 03:00</span></div>
      </div>`,
  },
  {
    title: "API Proteção Animal",
    status: "Acadêmico",
    statusKind: "acad",
    filter: "study",
    color: "node",
    desc: "API REST para uma ONG de proteção animal, com autenticação JWT, perfis de usuário e administrador, senhas com BCrypt e versionamento do banco com migrations.",
    chips: ["Java 17", "Spring Boot 3", "JWT", "JPA", "MySQL", "Flyway"],
    link: {text: "IFSP"},
    shot: `
      <div class="win" style="font:11px/1.8 var(--mono);color:var(--dim)">
        <div><span style="color:var(--accent)">POST</span> /auth/login</div>
        <div><span style="color:var(--node)">GET</span>&nbsp; /animais</div>
        <div><span style="color:var(--c-data)">PUT</span>&nbsp; /animais/{id}</div>
        <div><span style="color:var(--c-infra)">DEL</span>&nbsp; /animais/{id}</div>
      </div>`,
  },
  {
    title: "Cluster de servidores",
    status: "IFSP",
    statusKind: "acad",
    filter: "infra",
    color: "c-data",
    wide: true,
    desc: "Servidor da faculdade montado a partir de três PCs: instalei Debian 13 em cada nó, formei um cluster Docker Swarm com um manager e dois workers, configurei armazenamento compartilhado via NFS, firewall com UFW, rede privada entre os nós com Tailscale e acesso remoto com serviços systemd que sobem sozinhos no boot.",
    chips: ["Debian", "Docker", "Docker Swarm", "NFS", "Tailscale", "systemd"],
    link: {text: "Projeto da faculdade"},
    shot: `
      <div class="win" style="display:flex;align-items:center;justify-content:center;gap:clamp(12px,4vw,40px);padding-top:24px">
        <div class="col" style="flex:0 0 auto;align-items:center;gap:6px"><div class="sk c" style="width:64px;height:48px;opacity:.6"></div><span style="font:11px var(--mono);color:var(--fg)">manager</span></div>
        <div class="sk" style="height:2px;width:clamp(16px,6vw,60px)"></div>
        <div class="col" style="flex:0 0 auto;align-items:center;gap:6px"><div class="sk" style="width:64px;height:48px"></div><span style="font:11px var(--mono);color:var(--dim)">worker</span></div>
        <div class="sk" style="height:2px;width:clamp(16px,6vw,60px)"></div>
        <div class="col" style="flex:0 0 auto;align-items:center;gap:6px"><div class="sk" style="width:64px;height:48px"></div><span style="font:11px var(--mono);color:var(--dim)">worker</span></div>
      </div>`,
  },
  {
    title: "Mentor",
    status: "Em desenvolvimento",
    statusKind: "dev",
    filter: "study",
    color: "c-ai",
    wide: true,
    desc: "Sistema de agentes no Claude Code para estudo contínuo: um mentor que orienta sem escrever código, com bloqueio técnico de edição, e subagentes especializados por tema que geram exercícios e acompanham a evolução. Os exercícios são publicados direto no Compila.",
    chips: ["Claude Code", "Subagentes", "Skills", "Hooks", "Plugins"],
    link: {text: "Projeto pessoal"},
    shot: `
      <div class="win" style="font:11px/1.9 var(--mono);color:var(--dim)">
        <div class="row" style="align-items:center;gap:10px"><span style="color:var(--c-ai)">◆</span><span style="color:var(--fg)">mentor</span><div class="sk" style="height:7px;flex:1;max-width:40%"></div></div>
        <div class="row" style="align-items:center;gap:10px;padding-left:22px"><span>├─</span><span style="color:var(--fg)">java</span><div class="sk" style="height:7px;width:22%"></div></div>
        <div class="row" style="align-items:center;gap:10px;padding-left:22px"><span>├─</span><span style="color:var(--fg)">t-sql</span><div class="sk" style="height:7px;width:28%"></div></div>
        <div class="row" style="align-items:center;gap:10px;padding-left:22px"><span>└─</span><span style="color:var(--fg)">exercícios</span><div class="sk c" style="height:7px;width:18%;opacity:.6"></div></div>
      </div>`,
  },
  {
    title: "Compila",
    status: "Ativo",
    filter: "study",
    color: "node",
    desc: "Plataforma de prática de programação com exercícios e correção assistida por IA. A IA roda pela conta de cada usuário, sem custo de API para a plataforma.",
    chips: ["JavaScript", "Supabase", "IA"],
    link: {text: "GitHub", href: "https://github.com/zdANSZ"},
    shot: `
      <div class="win">
        <div class="row"><div class="col" style="flex:.9"><div class="sk" style="height:8px;width:80%"></div><div class="sk" style="height:8px"></div><div class="sk" style="height:8px;width:65%"></div><div class="sk c" style="height:20px;width:45%;opacity:.6;margin-top:6px"></div></div>
        <div class="col" style="flex:1.1;background:var(--surface);border-radius:6px;padding:8px"><div class="sk" style="height:6px;width:50%"></div><div class="sk" style="height:6px;width:80%"></div><div class="sk" style="height:6px;width:40%"></div><div class="sk" style="height:6px;width:70%"></div></div></div>
      </div>`,
  },
  {
    title: "Vekra",
    status: "Em desenvolvimento",
    statusKind: "dev",
    filter: "study",
    color: "accent",
    desc: "PWA de produtividade com kanban semanal, editor de documentos em blocos, workspaces com papéis de acesso e sincronização offline-first.",
    chips: ["Angular", "TypeScript", "Supabase", "IndexedDB"],
    link: {text: "Em desenvolvimento"},
    shot: `
      <div class="win">
        <div class="row" style="height:100%">
          <div class="col"><div class="sk" style="height:8px;width:50%"></div><div class="sk" style="height:26px"></div><div class="sk c" style="height:26px;opacity:.5"></div></div>
          <div class="col"><div class="sk" style="height:8px;width:50%"></div><div class="sk" style="height:26px"></div></div>
          <div class="col"><div class="sk" style="height:8px;width:50%"></div><div class="sk" style="height:26px"></div><div class="sk" style="height:26px"></div></div>
        </div>
      </div>`,
  },
  {
    title: "Lume Studio",
    status: "Em desenvolvimento",
    statusKind: "dev",
    filter: "study",
    color: "c-ai",
    desc: "Estúdio de IA que roda inteiro no navegador, com cada pessoa usando a própria conta e nenhuma chave exposta.",
    chips: ["JavaScript", "IA"],
    link: {text: "GitHub", href: "https://github.com/zdANSZ/nexa-ai"},
    shot: `
      <div class="win">
        <div class="sk c" style="height:56px;opacity:.35;margin-bottom:8px;border-radius:8px"></div>
        <div class="sk" style="height:26px;border-radius:13px"></div>
      </div>`,
  },
  {
    title: "MOBA DS",
    status: "Projeto pessoal",
    statusKind: "acad",
    filter: "study",
    color: "c-infra",
    desc: "Jogo homebrew para Nintendo DS: um MOBA por turnos com draft de personagens, sistema de experiência e bots com três níveis de dificuldade.",
    chips: ["C++", "devkitPro", "libnds"],
    link: {text: "Projeto pessoal"},
    shot: `
      <div class="win" style="display:grid;grid-template-columns:repeat(8,1fr);gap:4px;align-content:start">
        <div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk c" style="height:14px;opacity:.7"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div>
        <div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk c" style="height:14px;opacity:.4"></div><div class="sk" style="height:14px"></div>
        <div class="sk" style="height:14px"></div><div class="sk c" style="height:14px;opacity:.4"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div><div class="sk" style="height:14px"></div>
      </div>`,
  },
];
