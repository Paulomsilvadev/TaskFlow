const formCadastro = document.querySelector('form');

formCadastro.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('Senhas diferentes!');
        return;
    }

    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const emailExiste = usuariosCadastrados.some(user => user.email === email);
    if (emailExiste) {
        alert('Este e-mail já está cadastrado!');
        return;
    }

    const novoUsuario = { nome, email, senha };

    usuariosCadastrados.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));

    alert('Cadastro realizado com sucesso!');

    window.location.href = '../Login/login.html';
});




const btnLogin = document.getElementById('btnLogin');

if (btnLogin) {
    btnLogin.addEventListener('click', () => {
        window.location.href = '../Login/login.html';
    });
}