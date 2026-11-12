# Explicação do JavaScript do site Alpha Cross

Este guia explica os 4 arquivos de JavaScript do projeto: o que cada parte faz e por que foi feita assim.

## Visão geral

| Arquivo | Onde é usado | O que faz |
|---|---|---|
| `js/script.js` | Todas as 6 páginas | Menu do celular, fundo do header ao rolar e a função que abre o WhatsApp |
| `js/carrossel.js` | Só no `index.html` | Troca as fotos do carrossel, pelos botões e sozinho a cada 5 segundos |
| `js/contato.js` | Só no `contato.html` | Pega os dados do formulário e manda para o WhatsApp do Box |
| `js/planos.js` | Só no `planos.html` | Faz os botões "Consultar valores" abrirem o WhatsApp com o nome do plano |

**Por que 4 arquivos e não 1?** O `script.js` tem o que é comum a todas as páginas. Os outros três têm o que só uma página usa. Assim cada página carrega só o código de que precisa, e fica fácil achar onde está cada coisa.

**Por que o `<script>` fica no final do `<body>`?** O navegador lê o HTML de cima para baixo. Se o JS rodasse antes, ele procuraria o botão do menu, por exemplo, e ainda não acharia, porque o botão ainda não teria sido criado. No final do `body`, todo o HTML já existe.

**Por que o `script.js` vem antes dos outros?** O `contato.js` e o `planos.js` usam a função `AbrirWhatsApp`, que está no `script.js`. Ele precisa ser carregado primeiro para a função já existir.

```html
<script src="js/script.js"></script>
<script src="js/contato.js"></script>
```

---

## Conceitos que aparecem em todos os arquivos

Entendendo estes 5 pontos, o resto do código fica simples.

### 1. Pegar um elemento do HTML

Antes de mexer em qualquer coisa da página, o JS precisa "pegar" o elemento e guardar numa variável.

| Comando | O que pega | Exemplo no projeto |
|---|---|---|
| `document.getElementById("btnMenu")` | O elemento com aquele `id` | Botão do menu, campos do formulário |
| `document.querySelector("header nav")` | O **primeiro** elemento que combina com o seletor (igual ao seletor do CSS) | O `nav` dentro do `header` |
| `document.querySelectorAll(".planos .botao")` | **Todos** os elementos que combinam, em uma lista | Todos os botões dos planos |

### 2. Variáveis: `var` e `const`

- `var` guarda um valor que pode mudar. Exemplo: `var indice = 0` (a posição da foto muda a cada troca).
- `const` guarda um valor que nunca muda. Exemplo: `const tempoEntreFotos = 5000`.

Usamos `const` nos valores fixos para deixar claro que ninguém deve alterar aquilo no meio do código.

### 3. Eventos: "quando acontecer isso, rode aquela função"

```js
botaoMenu.onclick = AbrirMenu
```

Lê-se: "quando clicarem no `botaoMenu`, rode a função `AbrirMenu`".

**Atenção:** é `AbrirMenu` sem parênteses. Com parênteses (`AbrirMenu()`), a função rodaria na hora, uma vez só, em vez de esperar o clique.

Eventos usados no projeto:

| Evento | Quando acontece | Onde usamos |
|---|---|---|
| `onclick` | Ao clicar no elemento | Menu, botões do carrossel, botões dos planos |
| `onscroll` | Ao rolar a página | Fundo do header |
| `onload` | Quando a página termina de carregar | Início do carrossel |
| `onsubmit` | Quando o formulário é enviado | Formulário de contato |

### 4. Funções

Uma função é um bloco de código com nome, que só roda quando é chamado. No projeto os nomes começam com letra maiúscula (`AbrirMenu`, `MostrarFoto`), seguindo o padrão das aulas.

### 5. Classes do CSS ligadas pelo JS

O JS do projeto quase nunca muda o visual direto. Ele só **coloca ou tira uma classe**, e quem define o visual é o CSS.

| Comando | O que faz |
|---|---|
| `elemento.classList.add("rolando")` | Coloca a classe |
| `elemento.classList.remove("rolando")` | Tira a classe |
| `elemento.classList.toggle("aberto")` | Coloca se não tem, tira se já tem |

**Por que assim?** Cada linguagem fica com a sua função: o CSS cuida do visual e o JS cuida do comportamento.

---

## 1. `js/script.js` (todas as páginas)

### Pegando os elementos

```js
var header = document.querySelector("header")
var menu = document.querySelector("header nav")
var botaoMenu = document.getElementById("btnMenu")
```

Guarda o header, o menu e o botão hambúrguer (☰) em variáveis.

### Ligando os eventos

```js
botaoMenu.onclick = AbrirMenu
window.onscroll = MudarHeader
```

- Ao clicar no botão ☰, roda `AbrirMenu`.
- Ao rolar a página (`window` é a janela do navegador), roda `MudarHeader`.

**Por que aqui não usamos `window.onload`?** Só pode existir **um** `window.onload` por página. O `carrossel.js` já usa. Se o `script.js` também usasse, um apagaria o outro. Como o script está no final do `body`, o HTML já carregou e o `onload` não é necessário.

### `AbrirMenu`: menu do celular

```js
function AbrirMenu(){
    menu.classList.toggle("aberto")
}
```

No celular o menu fica escondido. O `toggle` coloca a classe `aberto` no primeiro clique (o CSS mostra o menu) e tira no segundo clique (o menu some).

**Por que `toggle`?** Com uma linha só, o mesmo botão abre e fecha. Sem ele, seria preciso um `if` para conferir se o menu está aberto.

### `MudarHeader`: fundo do header ao rolar

```js
function MudarHeader(){
    if(window.scrollY > 100){
        header.classList.add("rolando")
    }
    else{
        header.classList.remove("rolando")
    }
}
```

- `window.scrollY` é quantos pixels a página já desceu.
- Passou de 100px: coloca a classe `rolando`, e o CSS deixa o fundo do header quase preto.
- Voltou para o topo: tira a classe, e o header fica transparente de novo.

**Por que fizemos em JS?** Antes isso era feito só com CSS (`animation-timeline: scroll()`), mas esse recurso não funciona no Firefox. Com JS, funciona em todos os navegadores.

### `AbrirWhatsApp`: função reaproveitada

```js
const numeroWhatsApp = "5548998155379"

function AbrirWhatsApp(texto){
    var link = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(texto)
    window.open(link, "_blank")
}
```

- `numeroWhatsApp`: 55 (Brasil) + 48 (DDD) + o número, sem espaços.
- `texto` é um **parâmetro**: quem chama a função manda a mensagem que quer enviar.
- O `+` junta os pedaços de texto (concatenação) para montar o link.
- `encodeURIComponent(texto)` converte a mensagem para o formato de link. Um link não pode ter espaço nem acento, então o espaço vira `%20`, a quebra de linha vira `%0A`, e assim por diante. Sem isso, a mensagem chegaria cortada.
- `window.open(link, "_blank")` abre o link em uma nova aba, igual ao `target="_blank"` do HTML.

**Por que essa função fica no `script.js`?** Ela é usada pelo `contato.js` e pelo `planos.js`. Escrevemos uma vez e reaproveitamos. Se o número do Box mudar, basta trocar em um lugar só.

### Última linha: bloqueio do zoom no iPhone

```js
document.addEventListener('gesturestart', (e) => e.preventDefault());
```

Bloqueia o gesto de pinça (zoom com dois dedos) no iPhone, para o layout não desalinhar.

**Atenção para a apresentação:** esta linha é a única do projeto escrita em um estilo diferente do das aulas. Ela usa `addEventListener` e uma função de seta (`=>`), porque o evento `gesturestart` só existe no iPhone e não tem a forma curta do tipo `onclick`. Se o professor perguntar, a explicação é: "é outra forma de ligar um evento a uma função; `(e) => e.preventDefault()` é uma função curta, sem nome, que cancela o comportamento padrão do gesto".

---

## 2. `js/carrossel.js` (página inicial)

Segue a mesma lógica do carrossel feito em aula.

### Variáveis

```js
var botaoVoltar = document.getElementById("btnVoltar")
var botaoAvancar = document.getElementById("btnAvancar")
var moldura = document.getElementById("moldura")

var indice = 0

var galeria = {
    foto: ["imagem-carrossel-01.jpg","imagem-carrossel-02.jpg","imagem-carrossel-03.jpg"],
    descricao: ["Treino em grupo","Nossa estrutura","Comunidade Alpha"]
}

const tempoEntreFotos = 5000
const path = "img/fotos-box/fotos-carrossel/"
var temporizador
```

- `moldura` é a única tag `<img>` do carrossel. O carrossel não tem várias imagens: é uma imagem só, e o JS troca o arquivo que ela mostra.
- `indice` é a posição da foto atual. Começa em `0` porque listas (arrays) começam a contar do zero.
- `galeria` é um **objeto** com duas listas: os nomes dos arquivos e as descrições. A posição 0 de uma lista corresponde à posição 0 da outra.
- `tempoEntreFotos`: 5000 milissegundos = 5 segundos.
- `path` é o caminho da pasta das fotos. Assim não é preciso repetir a pasta em cada nome de arquivo.
- `temporizador` guarda o "relógio" da troca automática, para poder parar depois.

**Cuidado:** os nomes na lista `foto` precisam ser idênticos aos nomes dos arquivos na pasta, letra por letra. Se um nome estiver diferente, a imagem aparece quebrada.

### `Inicio`: o que roda quando a página carrega

```js
window.onload = Inicio

function Inicio() {
    botaoVoltar.onclick = VoltarFoto
    botaoAvancar.onclick = AvancarFoto
    MostrarFoto()
    AutomaticoFoto()
}
```

Quando a página termina de carregar: liga os dois botões, mostra a primeira foto e liga a troca automática.

### `AvancarFoto` e `VoltarFoto`

```js
function AvancarFoto(){
    if(indice < galeria.foto.length - 1){
        indice++
    }
    else{
        indice = 0
    }
    RestTime()
}
```

- `galeria.foto.length` é a quantidade de fotos (3).
- A última posição é `length - 1`, ou seja, 2 (as posições são 0, 1 e 2).
- Se ainda não está na última foto, soma 1 no índice (`indice++`).
- Se já está na última, volta para a primeira (`indice = 0`).

O `VoltarFoto` faz o contrário: diminui 1 (`indice--`) e, se já está na primeira, pula para a última.

**Por que o `if`?** Sem ele, o índice passaria da última foto, procuraria uma foto que não existe e o carrossel quebraria. Com ele, o carrossel dá a volta e nunca para.

**Por que `length` em vez do número 3?** Se alguém adicionar ou tirar fotos da lista, o código continua funcionando sem mexer em mais nada.

### `MostrarFoto`

```js
function MostrarFoto(){
    moldura.src = path+galeria.foto[indice]
    moldura.alt = galeria.descricao[indice]
}
```

- Troca o `src` da imagem: junta o caminho da pasta com o nome do arquivo da posição atual.
- Troca o `alt` pela descrição da mesma posição. O `alt` é o texto lido por leitores de tela, então é importante para acessibilidade.

### `AutomaticoFoto` e `RestTime`

```js
function AutomaticoFoto(){
    temporizador = setInterval(AvancarFoto,tempoEntreFotos)
}

function RestTime(){
    MostrarFoto()
    clearInterval(temporizador)
    AutomaticoFoto()
}
```

- `setInterval(AvancarFoto, 5000)` repete a função `AvancarFoto` a cada 5 segundos, sem parar.
- `clearInterval(temporizador)` para essa repetição.
- `RestTime` mostra a foto nova, para o relógio e liga de novo, começando os 5 segundos do zero.

**Por que reiniciar o relógio?** Imagine que a foto vai trocar sozinha daqui a 1 segundo e a pessoa clica em "avançar". Sem o `RestTime`, a foto trocaria no clique e de novo 1 segundo depois, e a pessoa nem veria a foto. Reiniciando, toda foto fica os 5 segundos completos na tela.

---

## 3. `js/contato.js` (página de contato)

O site não tem servidor nem banco de dados para receber o formulário. Por isso o formulário monta uma mensagem e abre o WhatsApp do Box com ela pronta.

### Pegando os campos

```js
var formulario = document.getElementById("formContato")
var campoNome = document.getElementById("nome")
var campoTelefone = document.getElementById("telefone")
var campoModalidade = document.getElementById("modalidade")
var campoMensagem = document.getElementById("mensagem")
var aviso = document.getElementById("aviso")
```

Guarda o formulário, cada campo e o parágrafo de aviso (onde aparece o "Obrigado").

### Ligando o evento

```js
formulario.onsubmit = EnviarMensagem
```

`onsubmit` acontece quando o formulário é enviado, pelo botão ou pela tecla Enter.

**Por que `onsubmit` no formulário, e não `onclick` no botão?** Com `onsubmit`, o navegador confere antes os campos marcados com `required` no HTML. Se o nome estiver vazio, ele mesmo avisa e a função nem roda. Com `onclick`, essa conferência não aconteceria.

### `EnviarMensagem`

```js
function EnviarMensagem(evento){
    evento.preventDefault()
```

- `evento` traz as informações do que aconteceu. O navegador envia esse parâmetro sozinho.
- `preventDefault()` cancela o comportamento padrão. O padrão de um formulário é recarregar a página ao enviar, e isso apagaria tudo antes de o nosso código rodar.

```js
    var nome = campoNome.value
    var telefone = campoTelefone.value
    var modalidade = campoModalidade.value
    var mensagem = campoMensagem.value
```

`.value` pega o que a pessoa digitou (ou escolheu, no caso do `select` de modalidade).

```js
    var texto = "Olá! Vim pelo site do Alpha Cross.\n" +
                "*Nome:* " + nome + "\n" +
                "*Telefone:* " + telefone + "\n" +
                "*Modalidade de interesse:* " + modalidade
```

- Monta a mensagem juntando os pedaços com `+`.
- `\n` é uma quebra de linha.
- Os asteriscos (`*Nome:*`) fazem o WhatsApp mostrar a palavra em **negrito**.

```js
    if(mensagem != ""){
        texto = texto + "\nMensagem: " + mensagem
    }
```

O campo de mensagem não é obrigatório. O `if` só acrescenta essa linha se a pessoa escreveu algo (`!= ""` significa "diferente de vazio").

```js
    AbrirWhatsApp(texto)

    aviso.innerText = "Obrigado, " + nome + "! Abrimos o WhatsApp com a sua mensagem, é só clicar em enviar."
    formulario.reset()
}
```

- `AbrirWhatsApp(texto)` chama a função do `script.js`, passando a mensagem montada.
- `aviso.innerText` escreve o agradecimento na página, com o nome da pessoa.
- `formulario.reset()` limpa todos os campos.

---

## 4. `js/planos.js` (página de planos)

Os donos do Box não querem mostrar preços no site. Então cada plano tem um botão "Consultar valores", que abre o WhatsApp já dizendo qual plano a pessoa quer.

### Pegando todos os botões

```js
var botoesPlano = document.querySelectorAll(".planos .botao")
```

Pega **todos** os elementos com a classe `botao` que estão dentro de um elemento com a classe `planos`. O resultado é uma lista: `botoesPlano[0]`, `botoesPlano[1]`...

**Por que `querySelectorAll`?** O `querySelector` pegaria só o primeiro botão. A página tem vários planos, e todos os botões precisam funcionar.

### Ligando a mesma função em todos os botões

```js
for(var i = 0; i < botoesPlano.length; i++){
    botoesPlano[i].onclick = EscolherPlano
}
```

O `for` é uma repetição com três partes:

| Parte | Significado |
|---|---|
| `var i = 0` | Começa com `i` valendo 0 (o primeiro botão) |
| `i < botoesPlano.length` | Continua enquanto `i` for menor que a quantidade de botões |
| `i++` | A cada volta, soma 1 no `i` |

Em cada volta, liga a função `EscolherPlano` no botão da posição `i`.

**Por que o `for`?** Sem ele, seria preciso escrever uma linha para cada botão. Com ele, se o Box criar um plano novo no HTML, o botão já funciona sem mudar o JS.

### `EscolherPlano`

```js
function EscolherPlano(evento){
    evento.preventDefault()
```

O botão é um link `<a>` normal para o WhatsApp. O `preventDefault()` cancela esse link simples, para abrirmos o WhatsApp com a mensagem personalizada.

**Vantagem:** se o JavaScript falhar ou não carregar, o link normal continua funcionando. O botão nunca fica "morto".

```js
    var card = this.parentElement
    var secao = card.parentElement
```

- `this` é o elemento que foi clicado, ou seja, o botão. É assim que a mesma função sabe **qual** dos botões foi usado.
- `parentElement` é o elemento "pai", aquele que está em volta. O pai do botão é o card do plano (`article`), e o pai do card é a seção da modalidade (`section`).

```js
    var nomePlano = card.querySelector("h3").innerText
    var modalidade = secao.querySelector(".titulo").textContent
```

- Procura o `h3` **dentro do card** e pega o texto dele (o nome do plano, como "Mensal").
- Procura o título **dentro da seção** e pega o texto dele (a modalidade).

**Por que pegar os dois?** Existe um plano "Mensal" no Crosstraining e outro no Alpha HIIT 45'. Só o nome do plano não bastaria para o Box saber qual é.

**Por que `innerText` em um e `textContent` no outro?** Os dois pegam o texto do elemento. A diferença:
- `innerText` pega o texto como aparece **na tela**.
- `textContent` pega o texto como está **escrito no HTML**.

O título da seção aparece em maiúsculas na tela por causa do CSS (`text-transform: uppercase`). Com `innerText`, a mensagem sairia "CROSSTRAINING". Com `textContent`, sai "Crosstraining", como está no HTML.

```js
    var texto = "Olá! Vim pelo site do Alpha Cross e tenho interesse no plano " + nomePlano + " (" + modalidade + "). Pode me passar os valores?"

    AbrirWhatsApp(texto)
}
```

Monta a mensagem com o nome do plano e a modalidade, e chama a função do `script.js`.

Exemplo de mensagem pronta: *"Olá! Vim pelo site do Alpha Cross e tenho interesse no plano Mensal (Crosstraining). Pode me passar os valores?"*

---

## Perguntas que o professor pode fazer

**1. Por que o script fica no final do `body`?**
Porque o JS precisa que os elementos do HTML já existam para conseguir pegá-los.

**2. Qual a diferença entre `var` e `const`?**
`var` pode mudar de valor, `const` não. Usamos `const` nos valores fixos (número do WhatsApp, tempo do carrossel, caminho das fotos).

**3. Por que `botao.onclick = Funcao` não tem parênteses?**
Sem parênteses, entregamos a função para ser usada no clique. Com parênteses, ela rodaria na hora.

**4. Para que serve o `preventDefault()`?**
Cancela o comportamento padrão do navegador. No formulário, impede a página de recarregar. No botão dos planos, impede o link normal de abrir.

**5. Como o carrossel sabe que chegou na última foto?**
Compara o `indice` com `galeria.foto.length - 1`. Se chegou, volta para 0.

**6. Para que serve o `clearInterval`?**
Para parar a troca automática e reiniciar a contagem dos 5 segundos quando alguém clica em um botão.

**7. Por que a função `AbrirWhatsApp` fica no `script.js`?**
Porque duas páginas usam (contato e planos). Escrevemos uma vez e reaproveitamos.

**8. Para que serve o `encodeURIComponent`?**
Converte espaços, acentos e quebras de linha para o formato aceito em links. Sem ele, a mensagem do WhatsApp chegaria cortada.

**9. Como a função `EscolherPlano` sabe qual botão foi clicado?**
Pelo `this`, que é o elemento que recebeu o clique. A partir dele, o `parentElement` sobe até o card e até a seção.

**10. Por que só o `carrossel.js` usa `window.onload`?**
Só pode haver um `window.onload` por página. Se dois arquivos usassem, um apagaria o outro.

**11. Por que o JS coloca classes em vez de mudar o estilo direto?**
Para separar as funções: o CSS define o visual, o JS só decide quando aplicar.
