
/*
    TASKFLOW - GERENCIAMENTO DE TAREFAS

    Responsabilidades:
    - Recuperar tarefas cadastradas
    - Exibir os cards
    - Filtrar tarefas
    - Concluir tarefas
    - Editar tarefas
    - Excluir tarefas
*/


// ========================================
// 1. ELEMENTOS DO HTML
// ========================================

const listaTarefas = document.getElementById("lista-tarefas");

const botoesFiltro = document.querySelectorAll("[data-filtro]");


// Filtro inicial
let filtroAtual = "todas";


// ========================================
// 2. FORMATAR DATA
// ========================================

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


// ========================================
// 3. CRIAR BOTÕES
// ========================================

function criarBotao(texto, classe, acao, id) {

    const botao = document.createElement("button");

    botao.type = "button";

    botao.textContent = texto;

    botao.className = classe;

    botao.dataset.acao = acao;

    botao.dataset.id = id;

    return botao;

}


// ========================================
// 4. EXIBIR TAREFAS
// ========================================

function mostrarTarefas() {

    // Recupera as tarefas através do Dados.js
    const tarefas = TaskFlowDados.carregarTarefas();

    // Limpa a lista antes de atualizar
    listaTarefas.innerHTML = "";


    // Aplica os filtros
    const tarefasFiltradas = tarefas.filter(function(tarefa) {

        if (filtroAtual === "pendentes") {
            return !tarefa.concluida;
        }

        if (filtroAtual === "concluidas") {
            return tarefa.concluida;
        }

        return true;

    });


    // Verifica se existem tarefas
    if (tarefasFiltradas.length === 0) {

        const mensagem = document.createElement("p");

        mensagem.className = "mensagem-vazia";

        mensagem.textContent = tarefas.length === 0
            ? "Você ainda não possui tarefas cadastradas."
            : "Nenhuma tarefa encontrada neste filtro.";

        listaTarefas.appendChild(mensagem);

        return;

    }


    // Percorre todas as tarefas filtradas
    tarefasFiltradas.forEach(function(tarefa) {

        // Cria o card
        const card = document.createElement("article");

        card.className = "tarefa-item";


        // Informações da tarefa
        const informacoes = document.createElement("div");

        informacoes.className = "tarefa-info";


        // Nome
        const nome = document.createElement("h2");

        nome.textContent = tarefa.nome;


        // Data
        const data = document.createElement("p");

        data.textContent = `Data de conclusão: ${formatarData(tarefa.data)}`;


        informacoes.appendChild(nome);

        informacoes.appendChild(data);


        // Status
        const status = document.createElement("span");

        if (tarefa.concluida) {

            status.className = "status concluida";

            status.textContent = "Concluída";

        } else {

            status.className = "status pendente";

            status.textContent = "Pendente";

        }


        // Área dos botões
        const acoes = document.createElement("div");

        acoes.className = "tarefa-acoes";


        // Botão concluir
        if (!tarefa.concluida) {

            const botaoConcluir = criarBotao(
                "Concluir",
                "btn-concluir",
                "concluir",
                tarefa.id
            );

            acoes.appendChild(botaoConcluir);

        }


        // Botão editar
        const botaoEditar = criarBotao(
            "Editar",
            "btn-editar",
            "editar",
            tarefa.id
        );

        acoes.appendChild(botaoEditar);


        // Botão excluir
        const botaoExcluir = criarBotao(
            "Excluir",
            "btn-excluir",
            "excluir",
            tarefa.id
        );

        acoes.appendChild(botaoExcluir);


        // Monta o card completo
        card.appendChild(informacoes);

        card.appendChild(status);

        card.appendChild(acoes);


        // Adiciona o card à página
        listaTarefas.appendChild(card);

    });

}


// ========================================
// 5. CONCLUIR, EDITAR E EXCLUIR
// ========================================

listaTarefas.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) {
        return;
    }

    const id = botao.dataset.id;

    const acao = botao.dataset.acao;


    // CONCLUIR
    if (acao === "concluir") {

        const sucesso = TaskFlowDados.concluirTarefa(id);

        if (sucesso) {

            mostrarTarefas();

        }

    }


    // EDITAR
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


        // Validação básica da data
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


    // EXCLUIR
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


// ========================================
// 6. FILTRAR TAREFAS
// ========================================

botoesFiltro.forEach(function(botao) {

    botao.addEventListener("click", function() {

        filtroAtual = botao.dataset.filtro;


        // Atualiza o botão selecionado
        botoesFiltro.forEach(function(item) {

            item.classList.remove("ativo");

        });

        botao.classList.add("ativo");


        // Atualiza os cards exibidos
        mostrarTarefas();

    });

});


// ========================================
// 7. CARREGAR TAREFAS AO ABRIR A PÁGINA
// ========================================

mostrarTarefas();
