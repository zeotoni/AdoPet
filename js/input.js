const inputFoto = document.getElementById('input-foto')


let imgBase64 = '';

inputFoto.addEventListener('change', ()=>{
    const imagem = inputFoto.files;
    if(imagem.length > 0) {
        const imagemSelecionada = imagem[0]
        
        const pegaFoto = new FileReader();
        pegaFoto.onload = (e)=> {
            imgBase64 = e.target.result;
            document.getElementById('img-perfil').src = imgBase64

        }

        pegaFoto.readAsDataURL(imagemSelecionada)
    }
})