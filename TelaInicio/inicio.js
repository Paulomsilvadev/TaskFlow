document.addEventListener("DOMContentLoaded", function(){

    console.log("TaksFlow iniciado com sucesso!")

   const btnLogin = document.getElementById('btnLogin');

if (btnLogin) {
    btnLogin.addEventListener('click', () => {
        window.location.href = '../Login/login.html';

    });
}
});