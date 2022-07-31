import { validaInput } from "./validacao.js";

const pegaUrl = new URL(window.location);
const id = pegaUrl.searchParams.get('id');

const iconePerfil = document.querySelector('[data-icone-perfil]');
iconePerfil.addEventListener('click', () => {
    window.location.href = `perfil.html?id=${id}`;
})

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
    validaInput(tel, tel.attributes.pattern, "Formato de telefone inválido")
})

formMensagem.addEventListener('submit', (e)=> {
    e.preventDefault();
    nome.value = "";
    tel.value = ("");
    nomeAnimal.value = ("");
    mensagem.value = ("");
    msgSucess.setAttribute("style", "display: block")
})

