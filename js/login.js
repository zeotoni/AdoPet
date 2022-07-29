
const inputEmail = document.querySelector('[data-email]');
const inputSenha = document.querySelector('[data-senha]');
const msgErro = document.querySelector('[data-msg-erro]')

const olhoSenha = document.querySelector('#olho-senha');

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
        inputSenha.setCustomValidity("Formato de senha inválido")
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


})

