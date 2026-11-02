// ALTERAÇÃO: arquivo criado. Envia o formulário da página de contato para o WhatsApp do box.
// Usa a função AbrirWhatsApp, que está no script.js (por isso o script.js é carregado antes no HTML)

var formulario = document.getElementById("formContato")
var campoNome = document.getElementById("nome")
var campoTelefone = document.getElementById("telefone")
var campoModalidade = document.getElementById("modalidade")
var campoMensagem = document.getElementById("mensagem")
var aviso = document.getElementById("aviso")

// onsubmit = quando o formulário é enviado (clicando no botão "Enviar mensagem" ou apertando Enter).
// Ele só acontece se os campos com "required" estiverem preenchidos, o navegador confere antes
formulario.onsubmit = EnviarMensagem


function EnviarMensagem(evento){

    // Por padrão, enviar um formulário RECARREGA a página.
    // preventDefault() cancela esse comportamento padrão, para o nosso código cuidar do envio
    evento.preventDefault()

    // .value pega o que a pessoa digitou (ou escolheu, no caso do select)
    var nome = campoNome.value
    var telefone = campoTelefone.value
    var modalidade = campoModalidade.value
    var mensagem = campoMensagem.value

    // monta o texto juntando partes com o + (concatenação)
    // "\n" é uma quebra de linha dentro do texto
    var texto = "Olá! Vim pelo site do Alpha Cross.\n" +
                "*Nome:* " + nome + "\n" +
                "*Telefone:* " + telefone + "\n" +
                "*Modalidade de interesse:* " + modalidade

    // a mensagem não é obrigatória, então só entra no texto se a pessoa escreveu algo
    if(mensagem != ""){
        texto = texto + "\nMensagem: " + mensagem
    }

    AbrirWhatsApp(texto)

    aviso.innerText = "Obrigado, " + nome + "! Abrimos o WhatsApp com a sua mensagem, é só clicar em enviar."
    formulario.reset()   // limpa todos os campos do formulário
}
