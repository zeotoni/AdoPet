const tel = document.querySelector('[data-tipo="telefone"]');
const nome = document.querySelector('[data-tipo="nome"]');
const nomeAnimal = document.querySelector('[data-tipo="nome-animal"]');
const mensagem = document.querySelector('[data-tipo="mensagem"]');

const formMensagem = document.querySelector('[data-form-mensagem]')
const msgSucess = document.querySelector('[data-msg-sucess]')

tel.addEventListener('input', (e) => {
    e.target.value = tel.value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
})

tel.addEventListener('blur', ()=> {
    let telValido = tel.attributes.pattern;
    if(!tel.value === telValido) {
        tel.setCustomValidity("Formato de telefone inválido")
    }else {
        tel.setCustomValidity("");
    }
})


formMensagem.addEventListener('submit', (e)=> {
    e.preventDefault();
    nome.value = "";
    tel.value = ("");
    nomeAnimal.value = ("");
    mensagem.value = ("");
    msgSucess.setAttribute("style", "display: block")
})
