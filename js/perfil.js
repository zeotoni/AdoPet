const pegaUrl = new URL(window.location);
const id = pegaUrl.searchParams.get('id');

const iconeMsg = document.querySelector('[data-icone-msg]')
iconeMsg.addEventListener('click', () => {
    window.location.href = `mensagem.html?id=${id}`;
})

const inputNome = document.querySelector('[data-nome]');
const inputTelefone = document.querySelector('[data-tel]');
const inputCidade = document.querySelector('[data-cidade]');
const inputSobre = document.querySelector('[data-sobre]');

const btnSalvarInfo = document.querySelector('[data-btn-info]')

inputTelefone.addEventListener('input', (e) => {
    e.target.value = inputTelefone.value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
})
const exibeDadosPerfil = () =>{
    fetch(`https://arquivo-json-adopet.herokuapp.com/usuarios/${id}`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response)
        let infoPerfil = {
            nome: response.infoPerfilSv.nome,
            cidade: response.infoPerfilSv.cidade,
            telefone: response.infoPerfilSv.telefone,
            sobre: response.infoPerfilSv.sobre
        }
        console.log(infoPerfil)
        inputNome.value = infoPerfil.nome;
        inputTelefone.value = infoPerfil.telefone;
        inputCidade.value = infoPerfil.cidade;
        inputSobre.value = infoPerfil.sobre
    })
    .catch(error => console.log(error))
}

btnSalvarInfo.addEventListener('click', () => {

    let userInfo = {
        "infoPerfilSv": {
            "nome": inputNome.value,
            "telefone": inputTelefone.value,
            "cidade": inputCidade.value,
            "sobre": inputSobre.value
          }
    }
    fetch(`https://arquivo-json-adopet.herokuapp.com/usuarios/${id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body:  JSON.stringify(userInfo)
    })
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response)
    })
    .catch(error => console.log(error))
    window.location.href = `perfil.html?id=${id}`;
})


// `https://arquivo-json-adopet.herokuapp.com/usuarios/${id}`