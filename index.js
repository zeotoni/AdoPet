const inputEmail = document.querySelector('#input-email');
const inputSenha = document.querySelector('#input-senha');
const inputSenhaConfirmar = document.querySelector('#input-confirmar');

const olhoSenha = document.querySelector('#olho-senha');
const olhoConfirmar = document.querySelector('#olho-confirmar')

inputEmail.addEventListener('blur', ()=>{
    const emailDigitado = inputEmail.value;
    const emailValidado = emailDigitado.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if(emailValidado) {
        inputEmail.setCustomValidity("");
        return
    } else {
       inputEmail.setCustomValidity("Esse formato de email não é válido");
    }
})


inputSenha.addEventListener('blur', () => {
    
    const senhaDigitada = inputSenha.value;
    const senhaValidada = senhaDigitada.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ !@#$%^&*_=+-]).{6,12}$/);
    if(senhaValidada) {
        inputSenha.setCustomValidity("")
        return
    } else {
        inputSenha.setCustomValidity("A senha deve conter entre 6 a 12 caracteres, deve conter números, letras maiúsculas e não deve conter caracteres especiais!")
    }
    
})


olhoSenha.addEventListener('click', ()=> {

    if(inputSenha.type === 'password') {
        inputSenha.setAttribute("type", "text");
        olhoSenha.setAttribute("src", "./assets/img/eye.svg")

    }else {
        inputSenha.setAttribute("type", "password");
        olhoSenha.setAttribute("src", "./assets/img/eye-closed.svg")
    }
})


olhoConfirmar.addEventListener('click', ()=> {

    if(inputSenhaConfirmar.type === 'password') {
        inputSenhaConfirmar.setAttribute("type", "text");
        olhoConfirmar.setAttribute("src", "./assets/img/eye.svg")

    }else {
        inputSenhaConfirmar.setAttribute("type", "password");
        olhoConfirmar.setAttribute("src", "./assets/img/eye-closed.svg")
    }
})

inputSenhaConfirmar.addEventListener('blur', ()=> {

    if(inputSenhaConfirmar.value === inputSenha.value) {
        inputSenhaConfirmar.setCustomValidity("");
        return
    }else {
        inputSenhaConfirmar.setCustomValidity("As senhas não conferem");
    }
});