const listaTarefas = document.getElementById("lista-tarefas");
const botoesFiltro = document.querySelectorAll("[data-filtro]");

let filtroAtual = "todas";

function formatarData(data) {
    if (!data) {
        return "Data não informada";
    }

    const partes = data.split("-");

    if (partes.length !== 3) {
        return data;
    }

    const [ano, mes, dia] = partes;

    return `${dia}/${mes}/${ano}`;
}

function criarBotao(texto, classe, acao, id) {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = texto;
    botao.className = classe;
    botao.dataset.acao = acao;
    botao.dataset.id = id;

    return botao;
}

function mostrarTarefas() {
    const tarefas = TaskFlowDados.carregarTarefas();

    listaTarefas.innerHTML = "";

    const tarefasFiltradas = tarefas.filter(function(tarefa) {
        if (filtroAtual === "pendentes") {
            return !tarefa.concluida;
        }

        if (filtroAtual === "concluidas") {
            return tarefa.concluida;
        }

        return true;
    });

    if (tarefasFiltradas.length === 0) {
        const mensagem = document.createElement("p");

        mensagem.className = "mensagem-vazia";
        mensagem.textContent = tarefas.length === 0
            ? "Você ainda não possui tarefas cadastradas."
            : "Nenhuma tarefa encontrada neste filtro.";

        listaTarefas.appendChild(mensagem);

        return;
    }

    tarefasFiltradas.forEach(function(tarefa) {
        const card = document.createElement("article");
        card.className = "tarefa-item";

        const informacoes = document.createElement("div");
        informacoes.className = "tarefa-info";

        const nome = document.createElement("h2");
        nome.textContent = tarefa.nome;

        const data = document.createElement("p");
        data.textContent = `Data de conclusão: ${formatarData(tarefa.data)}`;

        informacoes.appendChild(nome);
        informacoes.appendChild(data);

        const status = document.createElement("span");

        if (tarefa.concluida) {
            status.className = "status concluida";
            status.textContent = "Concluída";
        } else {
            status.className = "status pendente";
            status.textContent = "Pendente";
        }

        const acoes = document.createElement("div");
        acoes.className = "tarefa-acoes";

        if (!tarefa.concluida) {
            const botaoConcluir = criarBotao(
                "Concluir",
                "btn-concluir",
                "concluir",
                tarefa.id
            );

            acoes.appendChild(botaoConcluir);
        }

        const botaoEditar = criarBotao(
            "Editar",
            "btn-editar",
            "editar",
            tarefa.id
        );

        acoes.appendChild(botaoEditar);

        const botaoExcluir = criarBotao(
            "Excluir",
            "btn-excluir",
            "excluir",
            tarefa.id
        );

        acoes.appendChild(botaoExcluir);

        card.appendChild(informacoes);
        card.appendChild(status);
        card.appendChild(acoes);

        listaTarefas.appendChild(card);
    });
}

listaTarefas.addEventListener("click", function(event) {
    const botao = event.target.closest("button[data-acao]");

    if (!botao) {
        return;
    }

    const id = botao.dataset.id;
    const acao = botao.dataset.acao;

    if (acao === "concluir") {
        const sucesso = TaskFlowDados.concluirTarefa(id);

        if (sucesso) {
            mostrarTarefas();
        }
    }

    if (acao === "editar") {
        const tarefa = TaskFlowDados.buscarTarefa(id);

        if (!tarefa) {
            alert("Tarefa não encontrada.");
            return;
        }

        const novoNome = prompt(
            "Digite o novo nome da tarefa:",
            tarefa.nome
        );

        if (novoNome === null) {
            return;
        }

        if (!novoNome.trim()) {
            alert("O nome da tarefa não pode ficar vazio.");
            return;
        }

        const novaData = prompt(
            "Digite a nova data (AAAA-MM-DD):",
            tarefa.data
        );

        if (novaData === null) {
            return;
        }

        const formatoData = /^\d{4}-\d{2}-\d{2}$/;

        if (!formatoData.test(novaData)) {
            alert("Utilize o formato de data AAAA-MM-DD.");
            return;
        }

        try {
            const sucesso = TaskFlowDados.atualizarTarefa(id, {
                nome: novoNome,
                data: novaData
            });

            if (sucesso) {
                alert("Tarefa atualizada com sucesso!");
                mostrarTarefas();
            }
        } catch (erro) {
            alert(erro.message);
        }
    }

    if (acao === "excluir") {
        const confirmar = confirm(
            "Tem certeza que deseja excluir esta tarefa?"
        );

        if (confirmar) {
            const sucesso = TaskFlowDados.excluirTarefa(id);

            if (sucesso) {
                alert("Tarefa excluída com sucesso!");
                mostrarTarefas();
            }
        }
    }
});

botoesFiltro.forEach(function(botao) {
    botao.addEventListener("click", function() {
        filtroAtual = botao.dataset.filtro;

        botoesFiltro.forEach(function(item) {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        mostrarTarefas();
    });
});

mostrarTarefas();