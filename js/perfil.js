const pegaUrl = new URL(window.location);
const id = pegaUrl.searchParams.get('id');

const iconeMsg = document.querySelector('[data-icone-msg]')
iconeMsg.addEventListener('click', () => {
    window.location.href = `mensagem.html?id=${id}`;
})

const inputImg = document.querySelector('[data-input-foto]')
const imgPerfil = document.querySelector('[data-img-perfil]')
const perfilHeader = document.querySelector('[data-icone-perfil]')
const inputNome = document.querySelector('[data-nome]');
const inputTelefone = document.querySelector('[data-tel]');
const inputCidade = document.querySelector('[data-cidade]');
const inputSobre = document.querySelector('[data-sobre]');

const btnSalvarInfo = document.querySelector('[data-btn-info]');
const msgSucess = document.querySelector('[data-msg-sucess]');

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
        let infoPerfil = {
            nome: response.infoPerfilSv.nome,
            cidade: response.infoPerfilSv.cidade,
            telefone: response.infoPerfilSv.telefone,
            sobre: response.infoPerfilSv.sobre,
            imagem: response.infoPerfilSv.imagem
        }
        inputNome.value = infoPerfil.nome;
        inputTelefone.value = infoPerfil.telefone;
        inputCidade.value = infoPerfil.cidade;
        inputSobre.value = infoPerfil.sobre,
        imgPerfil.src = infoPerfil.imagem,
        perfilHeader.src = infoPerfil.imagem
    })
    .catch(error => console.log(error))
}

let imgBase64 = '';

inputImg.addEventListener('change', function() {
    const imagem = inputImg.files;
    
    if(imagem.length > 0) {

        const imagemSelecionada = imagem[0];

        const lerArquivo = new FileReader();

        lerArquivo.onload = function(e) {
            imgBase64 = e.target.result;
            imgPerfil.src = imgBase64;
        }

        lerArquivo.readAsDataURL(imagemSelecionada)
    }
})


btnSalvarInfo.addEventListener('click', (e) => {
    e.preventDefault();
    let userInfo = {
        "infoPerfilSv": {
            "nome": inputNome.value,
            "telefone": inputTelefone.value,
            "cidade": inputCidade.value,
            "sobre": inputSobre.value,
            "imagem": imgBase64
          }
    }
    fetch(`https://arquivo-json-adopet.herokuapp.com/usuarios/${id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body:  JSON.stringify(userInfo)
    })
    .then(response => {
        if(response.status === 200 || response.status === 201) {
            msgSucess.setAttribute("style", "display: block")
        }
    })
    .catch(error => console.log(error))
})
