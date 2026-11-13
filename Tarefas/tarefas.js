const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    window.location.href = '../Login/login.html';
}

const listaTarefas = document.getElementById('lista-tarefas');
const botoesFiltro = document.querySelectorAll('[data-filtro]');

let filtroAtual = 'todas';

function formatarData(data) {
    if (!data) return 'Não informada';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

function mostrarTarefas() { 
   const todasTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
   listaTarefas.innerHTML = '';

const tarefasDoUsuario = todasTarefas.filter((tarefa) => tarefa.usuarioEmail === usuarioLogado.emailUsuario);
const tarefasFiltradas = tarefasDoUsuario.filter((tarefa) => {
    if (filtroAtual === 'pendentes') {
        return !tarefa.concluida;
    }
    if (filtroAtual === 'concluidas') {
        return tarefa.concluida;
    }
    return true;
});

};



