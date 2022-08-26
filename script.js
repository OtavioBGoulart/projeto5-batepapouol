let mensagens = [];
let meuNome = "Otavio";

function atualizarMensagens() {
    setInterval(receba, 3000);
}

function receba() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizarMensagens);
    //const mostrarUltimaMensagem = document.querySelector("mensagensNaTela[length-1]");
    //console.log(mostrarUltimaMensagem);
    //mostrarUltimaMensagem.scrollIntoView();
}

function renderizarMensagens(dados) {
    //console.log(dados.data)
    mensagens = dados.data;
    const containerMensagens = document.querySelector("ul");
    containerMensagens.innerHTML = "";

    for (let i = 0; i < mensagens.length; i++) {

        if (mensagens[i].type == "status") {

            containerMensagens.innerHTML = containerMensagens.innerHTML + `
        <li class = "saiu-entrou">
        <span class="cor-horario">(${mensagens[i].time}) </span> <span class="negrito-nome"> ${mensagens[i].from} </span>  ${mensagens[i].text}
        </li> `;

        } else if (mensagens[i].to == meuNome) {
            containerMensagens.innerHTML = containerMensagens.innerHTML + `
        <li class="reservado">
        (${mensagens[i].time}) ${mensagens[i].from} reservadamente para ${meuNome}: ${mensagens[i].text}}
        </li>  `;

        } else {
            containerMensagens.innerHTML = containerMensagens.innerHTML + `
        <li>
        (${mensagens[i].time}) ${mensagens[i].from} para todos: ${mensagens[i].text}
        </li>  `

        }
    }
    containerMensagens.lastElementChild.scrollIntoView();
}

atualizarMensagens();
cadastro();

function cadastro() {

    let cadastroNome = prompt("Seja bem Vindo, qual seu nome?");

    const nome = {
        name: cadastroNome
    };

    const pedidoCadastro = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);
    pedidoCadastro.catch(nomeJaExiste);
}

function nomeJaExiste() {
    alert("Esse nome já existe, digite outro");
    cadastro();
}
