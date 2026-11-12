# Alpha Cross CT

Site do box de Crosstraining **Alpha Cross**, em Cocal do Sul – SC.

🔗 **Acesse o site:** https://jonathanjesusdarosa.github.io/SiteAlphaCross/

## Sobre o projeto

Trabalho da disciplina de **Desenvolvimento de Aplicações** (Engenharia de Software – 2ª fase).
O objetivo é apresentar o box, suas modalidades, planos e horários, e facilitar o contato dos alunos pelo WhatsApp.

### Equipe

- Jonathan Jesus
- Cassio
- Laura

## Páginas

| Página | Conteúdo |
|---|---|
| **Início** (`index.html`) | Apresentação, carrossel de fotos, resumo das modalidades e depoimentos |
| **Sobre** (`sobre.html`) | História do box, missão, visão, valores, equipe e localização |
| **Modalidades** (`modalidades.html`) | Detalhes do Cross Training e do Alpha Hiit 45 |
| **Planos** (`planos.html`) | Planos com preços e perguntas frequentes |
| **Horários** (`horarios.html`) | Grade de aulas de cada modalidade |
| **Contato** (`contato.html`) | Formulário, informações de contato e mapa |

## Funcionalidades

- Carrossel de fotos com botões e troca automática a cada 5 segundos
- Menu responsivo (vira menu ☰ no celular)
- Header que escurece ao rolar a página
- Formulário de contato que abre o WhatsApp com a mensagem pronta
- Botões dos planos que enviam o plano escolhido pelo WhatsApp
- Perguntas frequentes que abrem e fecham
- Layout adaptado para computador, tablet e celular

## Tecnologias

- **HTML5** – estrutura com tags semânticas (sem uso de `<div>`)
- **CSS3** – Flexbox, media queries, transições
- **JavaScript** – interatividade (carrossel, menu e integração com o WhatsApp)
- **Google Fonts** – Bebas Neue e Barlow Condensed
- **GitHub Pages** – hospedagem

## Estrutura de pastas

```
SiteAlphaCross/
├── index.html
├── sobre.html
├── modalidades.html
├── planos.html
├── horarios.html
├── contato.html
├── css/
│   ├── style.css        estilos comuns a todas as páginas
│   └── (um arquivo .css para cada página)
├── js/
│   ├── script.js        menu, header e WhatsApp (todas as páginas)
│   ├── carrossel.js     carrossel da página inicial
│   ├── contato.js       formulário de contato
│   └── planos.js        botões dos planos
└── img/                 logos e fotos
```

## Como abrir

Não precisa instalar nada: basta baixar o projeto e abrir o arquivo `index.html` no navegador,
ou acessar o link do site acima.
