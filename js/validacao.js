 export const mostraSenha = (input, iconeOlho) => {
    if(input.type === 'password') {
        input.setAttribute("type", "text");
        iconeOlho.setAttribute("src", "./assets/img/eye.svg")

    }else {
        input.setAttribute("type", "password");
        iconeOlho.setAttribute("src", "./assets/img/eye-closed.svg")
    }
}


export const validaInput = (input, validador, erro) => {
    if(input.value.match(validador)) {
        input.setCustomValidity("");
    }
    else {
        input.setCustomValidity(erro);
    }
}
