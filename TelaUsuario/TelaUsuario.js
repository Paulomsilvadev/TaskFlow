
function salvarPerfil() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (nome === "" || email === "") {
        alert("Preencha todos os campos!");
        return;
    }

    localStorage.setItem("nomeUsuario", nome);
    localStorage.setItem("emailUsuario", email);

    alert("Alterações salvas com sucesso!");
}

window.onload = function() {
    document.getElementById("nome").value =
        localStorage.getItem("nomeUsuario") || "";

    document.getElementById("email").value =
        localStorage.getItem("emailUsuario") || "";
};
