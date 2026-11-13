const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    window.location.href = '../Login/login.html';
}

const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const avatarInicial = document.getElementById('avatarInicial');
const btnSalvar = document.getElementById('btnSalvar');
const btnSair = document.getElementById('btnSair');

function carregarDadosPerfil() {
    inputNome.value = usuarioLogado.nomeUsuario || usuarioLogado.nome || '';
    inputEmail.value = usuarioLogado.emailUsuario || '';

    const textoBase = inputNome.value || inputEmail.value;
    if (textoBase) {
        avatarInicial.textContent = textoBase.charAt(0).toUpperCase();
    }
}

btnSalvar.addEventListener('click', () => {
    const novoNome = inputNome.value.trim();
    const novoEmail = inputEmail.value.trim();

    if (novoNome === '' || novoEmail === '') {
        alert('Preencha todos os campos!');
        return;
    }

    const emailAntigo = usuarioLogado.emailUsuario;

    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuariosCadastrados.find((u) => u.email === emailAntigo);

    if (usuarioEncontrado) {
        usuarioEncontrado.nome = novoNome;
        usuarioEncontrado.email = novoEmail;
        localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));
    }

    if (emailAntigo !== novoEmail) {
        const todasTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        todasTarefas.forEach((tarefa) => {
            if (tarefa.usuarioEmail === emailAntigo) {
                tarefa.usuarioEmail = novoEmail;
            }
        });
        localStorage.setItem('tarefas', JSON.stringify(todasTarefas));
    }

    usuarioLogado.nomeUsuario = novoNome;
    usuarioLogado.emailUsuario = novoEmail;
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

    avatarInicial.textContent = novoNome.charAt(0).toUpperCase();
    alert('Alterações salvas com sucesso!');
});

btnSair.addEventListener('click', () => {
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = '../Login/login.html';
});

carregarDadosPerfil();