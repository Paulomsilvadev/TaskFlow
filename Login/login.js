
window.addEventListener('DOMContentLoaded', () => {
    const usuarioSalvo = localStorage.getItem('usuario_lembrado');

    if (usuarioSalvo) {
        document.getElementById('email').value = usuarioSalvo;
        document.getElementById('lembrar').checked = true;
    }
});

const formLogin = document.querySelector('form');

formLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailUsuario = document.getElementById('email').value.trim();
    const senhaUsuario = document.getElementById('senha').value;
    const lembraCheckbox = document.getElementById('lembrar').checked;

    const usuariosCadastrados =
        JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuariosCadastrados.find((item) => {
        return item.email === emailUsuario && item.senha === senhaUsuario;
    });

    if (usuarioEncontrado) {

        sessionStorage.setItem(
            'usuarioLogado',
            JSON.stringify({
                emailUsuario: usuarioEncontrado.email
            })
        );

        if (lembraCheckbox) {
            localStorage.setItem('usuario_lembrado', emailUsuario);
        } else {
            localStorage.removeItem('usuario_lembrado');
        }

        
        window.location.href = '../Tarefas/Tarefas.html';

    } else {
        alert('Usuário ou senha incorretos!');
    }
});
