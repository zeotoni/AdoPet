const pegaUrl = new URL(window.location);
const id = pegaUrl.searchParams.get('id');

const exibeDadosPerfil = () =>{
    fetch(`http://localhost:3000/usuarios`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response)
    })
}