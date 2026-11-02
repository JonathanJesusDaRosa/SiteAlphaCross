// ALTERAÇÃO: arquivo criado. Os botões "Quero este plano" abrem o WhatsApp com o nome e o preço do plano escolhido.
// Usa a função AbrirWhatsApp, que está no script.js

// querySelectorAll pega TODOS os elementos que combinam com o seletor (o querySelector pega só o primeiro).
// O resultado é uma lista, parecida com um array: botoesPlano[0], botoesPlano[1]...
var botoesPlano = document.querySelectorAll("#planos .botao")

// for = repetição. Começa com i = 0 e vai somando 1 (i++) enquanto i for menor que a quantidade de botões.
// Assim ligamos a MESMA função nos 4 botões, sem precisar escrever 4 linhas iguais
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

    // procura DENTRO do card o título (h3) e o preço, e pega o texto deles
    var nomePlano = card.querySelector("h3").innerText
    var preco = card.querySelector(".preco").innerText

    var texto = "Olá! Vim pelo site da Alpha Cross e tenho interesse no plano " + nomePlano + " (" + preco + "). Pode me passar mais informações?"

    AbrirWhatsApp(texto)
}
