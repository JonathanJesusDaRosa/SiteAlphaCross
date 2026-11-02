// ALTERAÇÃO: arquivo criado. Os botões "Consultar valores" abrem o WhatsApp com o nome do plano escolhido.
// Usa a função AbrirWhatsApp, que está no script.js

// querySelectorAll pega TODOS os elementos que combinam com o seletor (o querySelector pega só o primeiro).
// O resultado é uma lista, parecida com um array: botoesPlano[0], botoesPlano[1]...
// ALTERAÇÃO: "#planos" virou ".planos", porque agora são 3 seções de planos com a mesma classe
var botoesPlano = document.querySelectorAll(".planos .botao")

// for = repetição. Começa com i = 0 e vai somando 1 (i++) enquanto i for menor que a quantidade de botões.
// Assim ligamos a MESMA função em todos os botões, sem precisar escrever uma linha para cada
for(var i = 0; i < botoesPlano.length; i++){
    botoesPlano[i].onclick = EscolherPlano
}


function EscolherPlano(evento){

    // o botão é um link <a> para o WhatsApp. preventDefault() cancela o link normal,
    // para abrirmos o WhatsApp com a mensagem pronta.
    // (se o JavaScript não carregar, o link normal continua funcionando)
    evento.preventDefault()

    // "this" é o elemento que foi clicado, ou seja, o botão.
    // parentElement é o elemento "pai" dele, que é o card (article) do plano
    var card = this.parentElement

    // ALTERAÇÃO: antes pegava o título e o preço. Agora pega o título do card (h3) e o título da seção (a modalidade),
    // porque existem dois planos "Mensal" (Cross Training e Alpha Hiit 45') e o site não mostra os preços.
    // O pai do card é a seção (section), e dentro dela o título tem a classe "titulo"
    var secao = card.parentElement
    var nomePlano = card.querySelector("h3").innerText
    // textContent pega o texto como está escrito no HTML. O innerText pegaria "CROSS TRAINING" em maiúsculo,
    // porque o CSS do .titulo usa text-transform: uppercase
    var modalidade = secao.querySelector(".titulo").textContent

    // ALTERAÇÃO: o site não mostra mais os preços, então a mensagem já pede os valores do plano
    var texto = "Olá! Vim pelo site do Alpha Cross e tenho interesse no plano " + nomePlano + " (" + modalidade + "). Pode me passar os valores?"

    AbrirWhatsApp(texto)
}
