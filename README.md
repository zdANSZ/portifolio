# Daniel Castilho — Portfólio

Site pessoal com meus projetos, tecnologias e formas de contato.

Desenvolvedor full stack, de Taubaté (SP), estudante de Análise e Desenvolvimento de Sistemas no IFSP. Desenvolvo sistemas web, APIs e automações, monto a infraestrutura onde eles rodam e uso agentes de IA no fluxo de desenvolvimento.

## Sobre o site

- Página única em HTML, CSS e JavaScript puro, sem framework e sem etapa de build
- Animação do hero feita em Canvas 2D, reagindo ao cursor
- Seções de stack e projetos com filtros e efeitos de hover
- Responsivo e com suporte a `prefers-reduced-motion`
- Português e inglês, com troca pelo botão PT/EN

## Estrutura

```
.
├── index.html            # marcação: hero, sobre, stack, contato e sprite dos ícones de marca
├── demos/
│   └── gestao-hoteleira/ # demonstração navegável do sistema de gestão hoteleira (dados fictícios)
├── curriculo/
│   └── curriculo.html    # fonte do currículo em PDF
└── assets/
    ├── curriculo-daniel-castilho.pdf   # baixado pelo botão "Currículo"
    ├── css/style.css     # estilos e tokens de cor (variáveis em :root)
    ├── img/              # foto (daniel.webp/.jpg), favicon, apple-touch-icon e og.png
    └── js/
        ├── projects.js   # dados dos cards de projetos (com versão em inglês)
        ├── i18n.js       # textos em inglês do botão PT/EN
        ├── icons.js      # SVGs do Devicon + ícones próprios da stack
        └── main.js       # monta projetos e stack, filtros, brilho do cursor e animação do hero
```

- **Novo projeto:** adicione um objeto em `assets/js/projects.js`; os campos estão descritos no topo do arquivo.
- **Nova tecnologia:** adicione uma linha em `techs` no `main.js`; se tiver logo no Devicon, inclua o SVG em `icons.js` com a mesma chave.
- **Textos em inglês:** o português fica no próprio `index.html`; marque o elemento com `data-i18n="chave"` e coloque a tradução em `assets/js/i18n.js`. Dá para abrir direto em inglês com `?lang=en` na URL.
- **Demos de projetos:** cada demo é uma página estática em `demos/<projeto>/`, reescrita só com a interface e dados fictícios (sem código, API ou banco do sistema real). No card, os campos `image` e `demo` do `projects.js` mostram a captura e o link.
- **Currículo:** edite `curriculo/curriculo.html`, abra no Chrome e use Imprimir → Salvar como PDF (A4, margens "Nenhuma"), substituindo `assets/curriculo-daniel-castilho.pdf`.
- **Domínio:** o site está em https://portifolio-dancastilho.vercel.app. Se mudar de domínio, atualize `canonical`, `og:url` e `og:image` no `index.html` (WhatsApp e LinkedIn exigem URL absoluta) e o link no currículo.

## Rodando localmente

Basta abrir o `index.html` no navegador.

## Deploy

No ar em https://portifolio-dancastilho.vercel.app — cada push na `main` publica automaticamente.


Publicado na Vercel como site estático: importe o repositório, mantenha o preset **Other** e faça o deploy.

## Contato

- LinkedIn: [linkedin.com/in/castilhodan](https://www.linkedin.com/in/castilhodan/)
- GitHub: [@zdANSZ](https://github.com/zdANSZ)

## Créditos

- Ícones de tecnologias: [Devicon](https://devicon.dev) (licença MIT)
- Ícones de redes sociais: [Font Awesome Free](https://fontawesome.com) (CC BY 4.0)
- Fontes: [Geist](https://vercel.com/font) via Google Fonts
