const exibeCards = () => {
    fetch(`http://localhost:3000/cardPets`)
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
                        <a href="mensagem.html"><img src="./assets/img/ícone-contato.png" alt="Ícone de mensagem"><span>Falar com o responsável</span></a> 
                    </address>
                </div>
            </li> `;
            document.querySelector('#lista-pets').appendChild(cardNovo)
            
        });
    })
}

