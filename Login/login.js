window.addEventListener('DOMContentLoaded', () => {
    const usuarioSalvo = localStorage.getItem('usuario_lembrado');
    if (usuarioSalvo) {
        document.getElementById('email').value = usuarioSalvo;
        document.getElementById('lembrar').checked = true;
    }
})

const formLogin = document.querySelector('form');

formLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    //area do input
    const emailUsuario = document.getElementById('email').value;
    const senhaUsuario = document.getElementById('senha').value;
    const lembraCheckbox = document.getElementById('lembrar').checked;

    //busca no json
    usuarioCadastrado = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarioCadastrado.find(function (item) {
        if (item.email == emailUsuario && item.senha == senhaUsuario) {
            return item.email === emailUsuario && item.senha === senhaUsuario;
        } else {
        }
        
    });



    //checkbox
    if (emailUsuario != "" && senhaUsuario !== "") {
        sessionStorage.setItem('usuarioLogado', JSON.stringify({ emailUsuario }));

        if (lembraCheckbox) {
            localStorage.setItem('usuario_lembrado', emailUsuario);
        } else {
            localStorage.removeItem('usuario_lembrado');
        }


    }

    if (usuarioEncontrado) {
        window.location.href = '../Index/index.html';  //se não aparecer a pagina precisa mudar isso
    } else if (usuarioEncontrado ){ //vai identificar falsy pq vai ser undefined
        //falta arrumar esse alerta, não está aparecendo quando a senha esta errada
        alert('Usuário ou senha incorreto!');
    }});