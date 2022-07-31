import {mostraSenha} from './validacao.js'
import { validaInput } from './validacao.js';

const inputEmail = document.querySelector('[data-email]');
const inputSenha = document.querySelector('[data-senha]');
const msgErro = document.querySelector('[data-msg-erro]')

const olhoSenha = document.querySelector('[data-icone-olho="olho-senha"]');

inputEmail.addEventListener('blur', ()=>{
    validaInput(inputEmail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Esse formato de email não é válido")
})

inputSenha.addEventListener('blur', () => {
    validaInput(inputSenha, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ !@#$%^&*_=+-]).{6,12}$/, "Formato de senha inválido") 
})

olhoSenha.addEventListener('click', ()=> {
   mostraSenha(inputSenha, olhoSenha)
})

const formLogin = document.querySelector('[data-form-login]');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`https://arquivo-json-adopet.herokuapp.com/usuarios`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        let userValid = { 
            email: "",
            nome: "",
            senha: "",
            id: ""
        }
        response.forEach(element => {
            if(inputEmail.value === element.emailSv && inputSenha.value === element.senhaSv) {
                userValid = {
                    email: element.emailSv,
                    nome: element.nomeSv,
                    senha: element.senhaSv,
                    id: element.id
                }
            }
        });
        const id = userValid.id;
        if(inputEmail.value === userValid.email && inputSenha.value === userValid.senha) {
            window.location.href = `home.html?id=${id}`;
          
        }else {
            inputSenha.value = ("");
            inputEmail.setAttribute("style", "border-color: red")
            inputSenha.setAttribute("style", "border-color: red")
            msgErro.setAttribute("style", "display: block")
            inputEmail.focus();
        }  
    }) 
    .catch(error => console.log(error))
})

