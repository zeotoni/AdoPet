import {mostraSenha} from './validacao.js';
import { validaInput } from './validacao.js';

const inputEmail = document.querySelector('[data-email]');
const inputNome = document.querySelector('[data-nome="nome"]');
const inputSenha = document.querySelector('[data-senha]');
const inputSenhaConfirmar = document.querySelector('[data-senha-confirmar="senha-confirmar"]');

const olhoSenha = document.querySelector('[data-icone-olho="olho-senha"]');
const olhoConfirmar = document.querySelector('[data-icone-olho="olho-confirmar"]');

inputEmail.addEventListener('blur', () => {
    validaInput(inputEmail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Esse formato de email não é válido");
});

inputSenha.addEventListener('blur', () => {
    validaInput(inputSenha, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ !@#$%^&*_=+-]).{6,12}$/, "A senha deve conter entre 6 a 12 caracteres, deve conter números, letras maiúsculas e não deve conter caracteres especiais!")
   
});

olhoSenha.addEventListener('click', ()=> {
    mostraSenha(inputSenha, olhoSenha)
});


olhoConfirmar.addEventListener('click', ()=> {
    mostraSenha(inputSenhaConfirmar, olhoConfirmar)
});

inputSenhaConfirmar.addEventListener('blur', ()=> {
    validaInput(inputSenhaConfirmar, inputSenha.value, "As senhas não conferem")
});


const formCadastro = document.querySelector('[data-form-cadastro]');
formCadastro.addEventListener('submit', ()=> {

    let jsonArr = {
        "emailSv": inputEmail.value, 
        "nomeSv": inputNome.value, 
        "senhaSv": inputSenha.value,
        "infoPerfilSv": {
            "nome": "",
            "telefone": "",
            "cidade": "",
            "sobre": ""
          }
    }
    
    const url = `https://arquivo-json-adopet.herokuapp.com/usuarios`;
    const options  = {
        method: 'POST',
        mode: 'cors',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(jsonArr)
    }
    fetch(url, options)
    .then(
        response => response.text()
    )
    .catch(error => console.log(error))
}) 
