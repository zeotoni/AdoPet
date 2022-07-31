const exibeCards = () => {
    fetch(`https://arquivo-json-adopet.herokuapp.com/cardPets`)
    .then(response => {
        return response.json()
    })
    .then(response => {
        let cardValores = {
            imgPet: "",
            imgAlt: "",
            petIdade: "",
            petPort: "",
            petCar: "",
            petAdress: ""
        }

        response.forEach(item => {
            cardValores = {
                imgPet: item.img,
                imgAlt: item.alt,
                petNome: item.petNome,
                petIdade: item.petIade,
                petPort: item.petPorte,
                petCar: item.petCarac,
                petAdress: item.petAdress
            }
            let cardNovo = document.createElement('li');
            cardNovo.innerHTML = `<li class="adocao__ficha">
            <img src="${item.img}" alt="${item.alt}" class="ficha__imagem">
                <div class="adocao__conteudo">
                    <h4 class="animal-nome">${item.petNome}</h4>
                    <p class="animal-idade">${item.petIade}</p>
                    <p class="animal-porte">${item.petPorte}</p>
                    <p class="animal-caracteristica">${item.petCarac}</p>
                    <address class="adocao__contato">
                        ${item.petAdress}
                        <a href="mensagem.html?id=${id}"><img src="./assets/img/ícone-contato.png" alt="Ícone de mensagem"><span>Falar com o responsável</span></a> 
                    </address>
                </div>
            </li> `;
            document.querySelector('[data-lista="lista-pets"]').appendChild(cardNovo)
            
        });
    })
    .catch(error => console.log(error))
}
const pegaUrl = new URL(window.location);
const id = pegaUrl.searchParams.get('id');

const iconePerfil = document.querySelector('[data-icone-perfil]');
const iconeMsg = document.querySelector('[data-icone-msg]');

iconePerfil.addEventListener('click', () => {
    window.location.href = `perfil.html?id=${id}`;
})

iconeMsg.addEventListener('click', () => {
    window.location.href = `mensagem.html?id=${id}`;
})
