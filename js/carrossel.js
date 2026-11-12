// ALTERAÇÃO: arquivo criado. Carrossel de fotos da seção "Sobre o Alpha".
// Mesma lógica do carrossel feito em aula (indice, MostrarFoto, AvancarFoto, VoltarFoto, RestTime),
// trocando o objeto "produto" por "galeria" e o tempo para 5 segundos

var botaoVoltar = document.getElementById("btnVoltar")
var botaoAvancar = document.getElementById("btnAvancar")
var moldura = document.getElementById("moldura")


var indice = 0   // posição da foto que está aparecendo (começa na primeira)

var galeria = {
    foto: ["imagem-carrossel-01.jpg","imagem-carrossel-02.jpg","imagem-carrossel-03.jpg"],
    descricao: ["Treino em grupo","Nossa estrutura","Comunidade Alpha"]
}

const tempoEntreFotos = 5000   // 5000 milissegundos = 5 segundos
const path = "img/fotos-box/fotos-carrossel/"   // caminho para a pasta das fotos do carrossel
var temporizador

window.onload = Inicio

function Inicio() {

    botaoVoltar.onclick = VoltarFoto
    botaoAvancar.onclick = AvancarFoto
    MostrarFoto()
    AutomaticoFoto()
}


function VoltarFoto(){

    if(indice > 0){
        indice--
    }
    else{
        indice = galeria.foto.length - 1   // se estava na primeira, volta para a última
    }

    RestTime()
}


function AvancarFoto(){

    if(indice < galeria.foto.length - 1){
        indice++
    }
    else{
        indice = 0   // se estava na última, volta para a primeira
    }

    RestTime()
}


// Mostra a nova foto e reinicia a contagem dos 5 segundos,
// assim a foto não troca logo depois de clicar no botão
function RestTime(){

    MostrarFoto()
    clearInterval(temporizador)
    AutomaticoFoto()
}

function AutomaticoFoto(){

    temporizador = setInterval(AvancarFoto,tempoEntreFotos)
}


function MostrarFoto(){

    moldura.src = path+galeria.foto[indice]
    moldura.alt = galeria.descricao[indice]
}
