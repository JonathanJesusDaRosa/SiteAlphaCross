// ALTERAÇÃO: arquivo criado. Aqui ficam as funções usadas em TODAS as páginas do site (menu, header e WhatsApp).
// Não usamos window.onload aqui porque o carrossel.js já usa, e um apagaria o outro.
// Como o <script> está no final do body, o HTML já carregou quando este código roda.

var header = document.querySelector("header")
var menu = document.querySelector("header nav")
var botaoMenu = document.getElementById("btnMenu")

botaoMenu.onclick = AbrirMenu
window.onscroll = MudarHeader


// Abre e fecha o menu no celular.
// classList.toggle coloca a classe "aberto" se ela não existe, e tira se ela já existe
function AbrirMenu(){

    menu.classList.toggle("aberto")
}


// ALTERAÇÃO: função que abre o WhatsApp do box com uma mensagem já escrita.
// Fica aqui no script.js porque é usada por mais de uma página (contato.js e planos.js),
// assim escrevemos uma vez só e reaproveitamos.
// ALTERAÇÃO: número do WhatsApp trocado para (48) 99815-5379 aqui e em todos os links wa.me das páginas HTML
const numeroWhatsApp = "5548998155379"   // 55 (Brasil) + 48 (DDD) + número, sem espaços

function AbrirWhatsApp(texto){

    // encodeURIComponent "traduz" o texto para o formato de link:
    // espaço vira %20, acento vira código, quebra de linha vira %0A...
    // sem isso, o link quebraria no primeiro espaço ou acento
    var link = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(texto)

    // abre o link em uma nova aba ("_blank"), igual ao target="_blank" do HTML
    window.open(link, "_blank")
}


// ALTERAÇÃO: substitui o "animation-timeline: scroll()" do CSS, que não funciona no Firefox.
// Quando a página desce mais de 100px, o header ganha a classe "rolando" (fundo escuro)
function MudarHeader(){

    if(window.scrollY > 100){
        header.classList.add("rolando")
    }
    else{
        header.classList.remove("rolando")
    }
}
