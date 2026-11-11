window.addEventListener('DOMContentLoaded', () => {
    const usuarioSalvo = localStorage.getItem('usuario_lembrado');
    if (usuarioSalvo) {
        document.getElementById('usuario').value = usuarioSalvo;
        document.getElementById('lembrar').checked = true;
    }
})

const formLogin = document.querySelector('form');

formLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const lembraCheckbox = document.getElementById('lembrar').checked;

    if (usuario != "" && senha !== "") {
        sessionStorage.setItem('usuarioLogado', JSON.stringify({ usuario }));
    
        if (lembraCheckbox) {
            localStorage.setItem('usuario_lembrado', usuario);
        } else {
            localStorage.removeItem('usuario_lembrado');
        }
        
        window.location.href = 'paginaprincpalquefaltacriarrsrs.html'; //trocar pela pagina html que fizerem
    } else {
        alert('Por favor, preencha usuário e senha.');
    }
    
});

/* ainda falta:
- validação email
- consulta se o usuario esta cadastrado e só assim permitir entrada
- cadastro do usuario


*/