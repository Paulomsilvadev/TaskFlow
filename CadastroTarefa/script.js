/*const formulario = document.getElementById("formTarefa");
const nomeTarefa = document.getElementById("nomeTarefa");
const dataTarefa = document.getElementById("dataTarefa");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event){

event.preventDefault();

const nome = nomeTarefa.value.trim();
const data = dataTarefa.value;

let terafa = JSON.parse(localStorage.getItem("tarefa")) || [];

const novaTarefa ={
    nome:nome,
    data:data
};

tarefas.push(novaTarefa);

localStorage.setItem("Tarefas", JSON.stringify(tarefas));

mensagem.textContent = "tarefa cadastrada com sucesso!";

formulario.reset();

});*/


// ========================================
// TASKFLOW - CADASTRO DE TAREFAS
// ========================================


// Recuperando os elementos do HTML
const formulario = document.getElementById("formTarefa");

const nomeTarefa = document.getElementById("nomeTarefa");

const dataTarefa = document.getElementById("dataTarefa");

const mensagem = document.getElementById("mensagem");


// ========================================
// CADASTRAR NOVA TAREFA
// ========================================

formulario.addEventListener("submit", function(event) {

    // Impede o recarregamento da página
    event.preventDefault();


    // Recupera os valores dos campos
    const nome = nomeTarefa.value.trim();

    const data = dataTarefa.value;


    // Validação dos campos
    if (!nome || !data) {

        mensagem.textContent = "Preencha todos os campos.";

        return;

    }


    try {

        // Envia os dados para o Dados.js
        const novaTarefa = TaskFlowDados.adicionarTarefa({

            nome: nome,

            data: data

        });


        // Exibe mensagem de sucesso
        mensagem.textContent = "Tarefa cadastrada com sucesso!";

        mensagem.style.color = "#16803b";


        // Limpa os campos do formulário
        formulario.reset();


        // Mostra no console a tarefa cadastrada
        console.log("Tarefa cadastrada:", novaTarefa);


    } catch (erro) {

        mensagem.textContent = erro.message;

        mensagem.style.color = "#e53935";

        console.error("Erro ao cadastrar tarefa:", erro);

    }

});
