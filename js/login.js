const input = document.querySelector(".login-input");
const button = document.querySelector(".login-button");
const form = document.querySelector(".login-form");
const validarInput = ({target}) => {
   if (target.value.length >= 3) {
    button.removeAttribute("disabled");
}else {
    button.setAttribute("disabled", '');

}
}
const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("jogador", input.value);
    window.location = "paginas/jogo.html";
    
}
input.addEventListener('input', validarInput);
form.addEventListener('submit',handleSubmit)