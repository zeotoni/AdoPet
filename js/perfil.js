const exibeDadosPerfil = () =>{
    fetch(`http://localhost:3000/usuarios`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response)
    })
}