fetch('obtener.php')
    .then(resultado => resultado.json())
    .then(datos => {
        const cant = Object.keys(datos).length; // Obtiene la cantidad de elementos del arreglo de objetos literales

        crearCards(cant, datos);
    }).catch(error => console.error(error));;

const contenedor = document.querySelector(".content")

function crearCards(cant, array){
    for (i=0; i<cant; i++){

        // Se obtienen las variables del array(datos)
        const name = array[i].nombre;
        const codPos = array[i].codPostal;
        const num = array[i].contacto;

        // Añade las nuevas cards a partir del total de resultados del JSON
        contenedor.innerHTML += `<div class='card'>
                <img src='https://imagenes.elpais.com/resizer/v2/4UPKL26K5ZICHFC6UIAU5DDHWU.jpg?auth=393fdef15d621d403eec4dc5bc104e8ce874f3be8958f4d708d2ca856b646922&width=1200'>
                <h2 id='name'>${name}</h2>
                <h3 id='codPos'>${codPos}</h3>
                <h3 id='num'>${num}</h3>
                </div>`;
        
    }
}