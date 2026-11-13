
/*
    TASKFLOW - Dados.js

    Responsável por:
    - Salvar tarefas
    - Recuperar tarefas
    - Cadastrar tarefas
    - Buscar tarefas
    - Editar tarefas
    - Concluir tarefas
    - Excluir tarefas
*/

const TaskFlowDados = (function () {

    // Chave de armazenamento compartilhada
    const CHAVE_TAREFAS = "taskflow_tarefas";


    // =====================================
    // 1. RECUPERAR TAREFAS
    // =====================================

    function carregarTarefas() {

        try {

            const dados = localStorage.getItem(CHAVE_TAREFAS);

            if (!dados) {
                return [];
            }

            const tarefas = JSON.parse(dados);

            return Array.isArray(tarefas) ? tarefas : [];

        } catch (erro) {

            console.error("Erro ao carregar tarefas:", erro);

            return [];

        }

    }


    // =====================================
    // 2. SALVAR TAREFAS
    // =====================================

    function salvarTarefas(tarefas) {

        if (!Array.isArray(tarefas)) {
            throw new Error("Os dados das tarefas precisam estar em uma lista.");
        }

        localStorage.setItem(
            CHAVE_TAREFAS,
            JSON.stringify(tarefas)
        );

    }


    // =====================================
    // 3. CADASTRAR NOVA TAREFA
    // =====================================

    function adicionarTarefa(dados) {

        const nome = String(dados.nome || "").trim();

        const data = String(dados.data || "").trim();

        if (!nome || !data) {
            throw new Error("Preencha o nome e a data da tarefa.");
        }

        const tarefas = carregarTarefas();

        const novaTarefa = {

            id: Date.now(),

            nome: nome,

            data: data,

            concluida: false

        };

        tarefas.push(novaTarefa);

        salvarTarefas(tarefas);

        return novaTarefa;

    }


    // =====================================
    // 4. BUSCAR UMA TAREFA PELO ID
    // =====================================

    function buscarTarefa(id) {

        const tarefas = carregarTarefas();

        return tarefas.find(function (tarefa) {

            return String(tarefa.id) === String(id);

        }) || null;

    }


    // =====================================
    // 5. EDITAR UMA TAREFA
    // =====================================

    function atualizarTarefa(id, novosDados) {

        const tarefas = carregarTarefas();

        const tarefa = tarefas.find(function (item) {

            return String(item.id) === String(id);

        });

        if (!tarefa) {
            return false;
        }

        if (novosDados.nome !== undefined) {

            const nome = String(novosDados.nome).trim();

            if (!nome) {
                throw new Error("O nome da tarefa não pode ficar vazio.");
            }

            tarefa.nome = nome;

        }

        if (novosDados.data !== undefined) {

            const data = String(novosDados.data).trim();

            if (!data) {
                throw new Error("Informe a data da tarefa.");
            }

            tarefa.data = data;

        }

        salvarTarefas(tarefas);

        return true;

    }


    // =====================================
    // 6. CONCLUIR UMA TAREFA
    // =====================================

    function concluirTarefa(id) {

        const tarefas = carregarTarefas();

        const tarefa = tarefas.find(function (item) {

            return String(item.id) === String(id);

        });

        if (!tarefa) {
            return false;
        }

        tarefa.concluida = true;

        salvarTarefas(tarefas);

        return true;

    }


    // =====================================
    // 7. EXCLUIR UMA TAREFA
    // =====================================

    function excluirTarefa(id) {

        const tarefas = carregarTarefas();

        const novasTarefas = tarefas.filter(function (tarefa) {

            return String(tarefa.id) !== String(id);

        });

        if (novasTarefas.length === tarefas.length) {
            return false;
        }

        salvarTarefas(novasTarefas);

        return true;

    }


    // =====================================
    // DISPONIBILIZAR AS FUNÇÕES
    // =====================================

    return {

        carregarTarefas,

        salvarTarefas,

        adicionarTarefa,

        buscarTarefa,

        atualizarTarefa,

        concluirTarefa,

        excluirTarefa

    };

})();
