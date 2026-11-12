const formulario = document.getElementById("formTarefa");
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

});
