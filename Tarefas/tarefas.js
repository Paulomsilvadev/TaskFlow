const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    window.location.href = '../Login/login.html';
}

const listaTarefas = document.getElementById('lista-tarefas');
const botoesFiltro = document.querySelectorAll('[data-filtro]');

let filtroAtual = 'todas';

const nivelPrioridade = {
    baixa: 'Baixa',
    media: 'Média',
    alta: 'Alta'
};

function formatarData(data) {
    if (!data) return 'Não informada';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

function mostrarTarefas() {
    const todasTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    listaTarefas.innerHTML = '';

    const tarefasDoUsuario = todasTarefas.filter(
        (tarefa) => tarefa.usuarioEmail === usuarioLogado.emailUsuario
    );

    const tarefasFiltradas = tarefasDoUsuario.filter((tarefa) => {
        if (filtroAtual === 'pendentes') {
            return !tarefa.concluida;
        }
        if (filtroAtual === 'concluidas') {
            return tarefa.concluida;
        }
        return true;
    });

    if (tarefasFiltradas.length === 0) {
        listaTarefas.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
        return;
    }

    tarefasFiltradas.forEach((tarefa) => {
        const nivel = tarefa.prioridade || 'media';

        listaTarefas.innerHTML += `
            <article class="tarefa-item">
                <div class="tarefa-info">
                    <h2>${tarefa.titulo}</h2>
                    <p>${tarefa.descricao}</p>
                    <p>Início: ${formatarData(tarefa.dataInicio)} | Conclusão: ${formatarData(tarefa.dataConclusao)}</p>
                </div>
                
                <span class="prioridade ${nivel}">
                    Prioridade: ${nivelPrioridade[nivel]}
                </span>

                <span class="status ${tarefa.concluida ? 'concluida' : 'pendente'}">
                    ${tarefa.concluida ? 'Concluída' : 'Pendente'}
                </span>

                <div class="tarefa-acoes">
                    ${!tarefa.concluida ? `<button type="button" class="btn-concluir" data-acao="concluir" data-id="${tarefa.id}">Concluir</button>` : ''}
                    <button type="button" class="btn-editar" data-acao="editar" data-id="${tarefa.id}">Editar</button>
                    <button type="button" class="btn-excluir" data-acao="excluir" data-id="${tarefa.id}">Excluir</button>
                </div>
            </article>
        `;
    });
}

botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach((b) => b.classList.remove('ativo'));
        botao.classList.add('ativo');

        filtroAtual = botao.dataset.filtro;
        mostrarTarefas();
    });
});

listaTarefas.addEventListener('click', (event) => {
    const botao = event.target.closest('button[data-acao]');
    if (!botao) return;

    const acao = botao.dataset.acao;
    const id = Number(botao.dataset.id);

    let todasTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    if (acao === 'concluir') {
        const tarefa = todasTarefas.find((t) => t.id === id);
        if (tarefa) {
            tarefa.concluida = true;
        }
    }

    if (acao === 'editar') {
        const tarefa = todasTarefas.find((t) => t.id === id);
        if (!tarefa) return;

        const novoTitulo = prompt('Novo título da tarefa:', tarefa.titulo);
        if (novoTitulo === null || novoTitulo.trim() === '') return;

        const novaDescricao = prompt('Nova descrição da tarefa:', tarefa.descricao);
        if (novaDescricao === null) return;

        tarefa.titulo = novoTitulo.trim();
        tarefa.descricao = novaDescricao.trim();
    }

    if (acao === 'excluir') {
        const confirmar = confirm('Deseja realmente excluir esta tarefa?');
        if (!confirmar) return;

        todasTarefas = todasTarefas.filter((t) => t.id !== id);
    }

    localStorage.setItem('tarefas', JSON.stringify(todasTarefas));
    mostrarTarefas();
});

mostrarTarefas();