import { validaInput } from './validacao.js';

const pegaUrl = new URL(window.location);
const id = pegaUrl.searchParams.get('id');

const inputSenha = document.querySelector('[data-tipo="senha"]');
const inputSenhaConfirmar = document.querySelector('[data-tipo="senha-confirmar"]');
const btnMudarSenha = document.querySelector('[data-mudar-senha]');
const msgSucess = document.querySelector('[data-msg-sucess]');
const btnLogin = document.querySelector('[data-tipo="redefinir-logar"]')


btnMudarSenha.addEventListener('click', (e) => {

    const validador = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ !@#$%^&*_=+-]).{6,12}$/;
    const senhaValida = inputSenha.value.match(validador);

    const senhaConfirmarValida = inputSenhaConfirmar.value == senhaValida;

    e.preventDefault();

    if (!senhaValida) {
        inputSenha.setAttribute("style", "border-color: red");
        inputSenha.parentElement.querySelector('.input-mensagem-erro').innerHTML = "A senha deve conter entre 6 a 12 caracteres, deve conter números, letras maiúsculas e não deve conter caracteres especiais!";
    } else {
        inputSenha.removeAttribute("style", "border-color: red");
        inputSenha.parentElement.querySelector('.input-mensagem-erro').innerHTML = "";
    }

    if (!senhaConfirmarValida) {
        inputSenhaConfirmar.setAttribute("style", "border-color: red");
        inputSenhaConfirmar.parentElement.querySelector('.input-mensagem-erro').innerHTML = "As senhas não conferem!";

    } else {
        inputSenhaConfirmar.removeAttribute("style", "border-color: red");
        inputSenhaConfirmar.parentElement.querySelector('.input-mensagem-erro').innerHTML = "";

        let novaSenha = { "senhaSv": inputSenhaConfirmar.value}
        fetch(`https://arquivo-json-adopet.herokuapp.com/usuarios/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body:  JSON.stringify(novaSenha)
        })
        .then(response => {
            if(response.status === 200 || response.status === 201) {
                msgSucess.setAttribute("style", "display: block");
                btnLogin.setAttribute("style", "display: block");
            }
        })
        .catch(error => console.log(error))
    }
})
