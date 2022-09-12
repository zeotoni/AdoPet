import { validaInput } from './validacao.js';
const pegaUrl = new URL(window.location);
const id = pegaUrl.searchParams.get('id');

const inputSenha = document.querySelector('[data-senha]');
const inputSenhaConfirmar = document.querySelector('[data-senha-confirmar]');
const btnMudarSenha = document.querySelector('[data-mudar-senha]');
const msgSucess = document.querySelector('[data-msg-sucess]')

inputSenha.addEventListener('blur', () => {
    validaInput(inputSenha, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ !@#$%^&*_=+-]).{6,12}$/, "A senha deve conter entre 6 a 12 caracteres, deve conter números, letras maiúsculas e não deve conter caracteres especiais!")
});

inputSenhaConfirmar.addEventListener('blur', ()=> {
    validaInput(inputSenhaConfirmar, inputSenha.value, "As senhas não conferem")
});

btnMudarSenha.addEventListener('click', (e) => {
    e.preventDefault();
    let novaSenha = { "senhaSv": inputSenhaConfirmar.value}
    fetch(`https://arquivo-json-adopet.herokuapp.com/usuarios/${id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body:  JSON.stringify(novaSenha)
    })
    .then(response => {
        if(response.status === 200 || response.status === 2001) {
            msgSucess.setAttribute("style", "display: block")
        }
    })
    .catch(error => console.log(error))
})