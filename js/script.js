// ALTERAÇÃO: arquivo criado. Aqui ficam as funções usadas em TODAS as páginas do site (menu e header).
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
