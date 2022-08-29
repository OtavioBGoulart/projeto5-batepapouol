let mensagens = [];
let cadastroNome;
let nome;

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
        <span class="cor-horario">(${mensagens[i].time})</span> <span class="negrito-nome"> <strong>${mensagens[i].from}</strong> </span>  ${mensagens[i].text}
        </li> `;

        } else if (mensagens[i].to == cadastroNome && mensagens[i].type == "private_message") {
            containerMensagens.innerHTML = containerMensagens.innerHTML + `
        <li class="reservado">
        <span class="cor-horario">(${mensagens[i].time})</span> <span class="negrito-nome"> <strong>${mensagens[i].from}</strong> </span> reservadamente para <span class="negrito-nome"> <strong>${cadastroNome}:</strong> </span> ${mensagens[i].text}
        </li>  `;

        } else if (mensagens[i].to !== "Todos" && mensagens[i].type == "message") {
            containerMensagens.innerHTML = containerMensagens.innerHTML + `
        <li>
        <span class="cor-horario">(${mensagens[i].time})</span> <span class="negrito-nome"> <strong>${mensagens[i].from}</strong> </span> para <span class="negrito-nome"> <strong>${mensagens[i].to}:</strong> </span> ${mensagens[i].text}
        </li>  `

        } else if (mensagens[i].to == "Todos") {
            containerMensagens.innerHTML = containerMensagens.innerHTML + `
        <li>
        <span class="cor-horario">(${mensagens[i].time})</span> <span class="negrito-nome"> <strong>${mensagens[i].from}</strong> </span> para <span class="negrito-nome"> <strong>todos</strong> </span>: ${mensagens[i].text}
        </li>  `

        }
    }
    containerMensagens.lastElementChild.scrollIntoView();
}

atualizarMensagens();
cadastro();
manterConexaoSempre();


function cadastro() {

    cadastroNome = prompt("Seja bem Vindo, qual seu nome?");

    nome = {
        name: cadastroNome
    };

    const pedidoCadastro = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);
    pedidoCadastro.catch(nomeJaExiste);
}

function nomeJaExiste() {
    alert("Esse nome já existe, digite outro");
    cadastro();
}

function manterConexao() {

    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
}

function manterConexaoSempre() {
    setInterval(manterConexao, 5000);
}

function enviarMensagem() {

    let selecionarMensagem = document.querySelector("input");
    let mensagemSelecionada = selecionarMensagem.value;
    console.log(mensagemSelecionada);
    let mensagem = {
        from: cadastroNome,
        to: "Todos",
        text: mensagemSelecionada,
        type: "message"
    };

    const envioMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    envioMensagem.catch(errorMensagem);

    selecionarMensagem.value = "";
}

function errorMensagem() {
    window.location.reload();
}



