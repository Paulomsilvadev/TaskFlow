const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    window.location.href = '../Login/login.html';
}

const formTarefas = document.querySelector('form')

formTarefas.addEventListener('submit', (event) => {
    event.preventDefault();

    const titulo = document.getElementById('nomeTarefa').value.trim();
    const descricao = document.getElementById('descricaoTarefa').value.trim();
    const dataInicio = document.getElementById('dataInicio').value;
    const dataConclusao = document.getElementById('dataConclusao').value;
    const prioridade = document.getElementById('prioridadeTarefa').value;

    if (dataConclusao < dataInicio) {
        alert("Digite uma data válida")
        return;
    }  

    const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas')) || [];

    const novaTarefa = { 
        titulo,
        descricao, 
        dataInicio, 
        dataConclusao,
        id: Date.now(), 
        usuarioEmail: usuarioLogado.emailUsuario, 
        prioridade,
        concluida: false
    };

    tarefasCadastradas.push(novaTarefa);

    localStorage.setItem('tarefas', JSON.stringify(tarefasCadastradas));

    alert('Tarefa cadastrada com sucesso!')
    window.location.href='../Tarefas/Tarefas.html';
})
