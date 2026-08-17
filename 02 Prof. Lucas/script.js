// Obtener personas registradas en la base de datos
fetch('obtener.php')
    .then(resultado => resultado.json())
    .then(datos => {

        // Obtiene la cantidad de registros obtenidos dentro de 'datos'
        const cant = Object.keys(datos).length;

        crearCards(cant, datos);

        // Obtener los botones después de crear las cards
        const botones = document.getElementsByClassName("btn-edit");

        // Añade un eventListener de click a cada botón
        for (let boton of botones) {
            boton.addEventListener("click", cambiarNombre);
        }

    })
    .catch(error => console.error(error));

const contenedor = document.querySelector(".content");

// Crear cards dinámicamente
function crearCards(cant, array) {

    for (let i = 0; i < cant; i++) {

        const name = array[i].nombre;
        const codPos = array[i].codPostal;
        const num = array[i].contacto;

        contenedor.innerHTML += `
            <div class='card'>
                <img src='https://imagenes.elpais.com/resizer/v2/4UPKL26K5ZICHFC6UIAU5DDHWU.jpg?auth=393fdef15d621d403eec4dc5bc104e8ce874f3be8958f4d708d2ca856b646922&width=1200'>
                <h2 class='name'>${name}</h2>
                <h3 class='codPos'>${codPos}</h3>
                <h3 class='num'>${num}</h3>
                <button class='btn-edit'>Editar</button>
            </div>
        `;
    }
}

// ================================== CAMBIAR DATOS DE FORMA DINÁMICA ========================================

// Cambiar nombres
function cambiarNombre() {

    // Busca el nombre dentro de la card del botón presionado
    const name = this.parentElement.querySelector(".name");

    // Obtiene el nuevo nombre a cambiar mediante registro de usuario
    const nuevoNombre = prompt(
        `¿Cambiar el nombre de ${name.textContent}?`
    );

    // Si se ingresó un nuevo nombre, se procede a actualizar la base de datos
    if (nuevoNombre) {
        fetch("update.php", { // Permite realizar una petición HTTP desde JavaScript.
            method: "POST",
            headers: { // Los headers contienen información sobre la petición.
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                actNombre: name.textContent,
                newNombre: nuevoNombre
            })
        })
        .then(respuesta => respuesta.json())
        .then(datos => {

            console.log(datos);
            if (datos.success) {
                name.textContent = nuevoNombre;
            }
        });
    }
}