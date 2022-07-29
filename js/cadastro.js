const inputEmail = document.querySelector('[data-email]');
const inputNome = document.querySelector('[data-nome="nome"]');
const inputSenha = document.querySelector('[data-senha]');
const inputSenhaConfirmar = document.querySelector('[data-senha-confirmar="senha-confirmar"]');

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

export default  function mostraSenha(input,iconeOlho) {

    if(input.type === 'password') {
        input.setAttribute("type", "text");
        iconeOlho.setAttribute("src", "./assets/img/eye.svg")

    }else {
        input.setAttribute("type", "password");
        iconeOlho.setAttribute("src", "./assets/img/eye-closed.svg")
    }
}

olhoSenha.addEventListener('click', ()=> {
    mostraSenha(inputSenha, olhoSenha);
})



olhoConfirmar.addEventListener('click', ()=> {
    
    mostraSenha(inputSenhaConfirmar, olhoConfirmar);
    
})

inputSenhaConfirmar.addEventListener('blur', ()=> {

    if(inputSenhaConfirmar.value === inputSenha.value) {
        inputSenhaConfirmar.setCustomValidity("");
        return
    }else {
        inputSenhaConfirmar.setCustomValidity("As senhas não conferem");
    }
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
    
    const url = `http://localhost:3000/usuarios`;
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

// export default mostraSenha;