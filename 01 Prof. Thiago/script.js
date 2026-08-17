// Escucha el evento que se dispara cuando la estructura HTML de la página terminó de cargarse en el navegador
document.addEventListener('DOMContentLoaded', cargarTabla);

// Función principal para solicitar los registros al servidor y renderizarlos en la tabla
function cargarTabla() {
    // Realiza una petición HTTP asíncrona (GET) en segundo plano al archivo 'OBTENER.php'
    fetch('OBTENER.php')
        // Toma la respuesta cruda del servidor y la convierte (parsea) de JSON a un arreglo de objetos de JavaScript
        .then(res => res.json())
        // Recibe el arreglo de datos ya transformado para trabajar con él
        .then(datos => {
            // Inicializa una variable de texto vacía que servirá como acumulador para las filas de la tabla
            let html = '';

            // Recorre cada elemento (objeto/registro) dentro del arreglo 'datos'
            for (let f of datos) {
                // Concatena una nueva fila <tr> inyectando los datos de las propiedades del objeto 'f' en celdas <td>
                html += `<tr>
                    <td>${f.id}</td>
                    <td>${f.nombre}</td>
                    <td>${f.codpostal}</td>
                    <td>${f.contacto}</td>
                    <td><button onclick="eliminar(${f.id})">Eliminar</button></td>
                </tr>`;
            }

            // Inyecta el contenido acumulado dentro del <tbody id="tablaCuerpo">. 
            // Si 'html' quedó vacío (sin registros), el operador || inserta la fila por defecto "Sin datos"
            document.getElementById('tablaCuerpo').innerHTML = html || '<tr><td colspan="5">Sin datos</td></tr>';
        });
}

// Función que recibe el identificador único del registro que se quiere borrar
function eliminar(id) {
    // Abre una ventana modal de confirmación del navegador; ejecuta el bloque solo si el usuario hace clic en "Aceptar"
    if (confirm("¿Borrar registro?")) {
        // Envía una petición HTTP al servidor adjuntando el 'id' en la URL como parámetro de consulta (Query String)
        fetch('ELIMINAR.php?id=' + id)
            // Obtiene la respuesta del servidor PHP en formato de texto plano
            .then(res => res.text())
            // Recibe la cadena de texto enviada por PHP (por ejemplo: "¡Registro eliminado con éxito!")
            .then(mensaje => {
                // 1º Vuelve a ejecutar la consulta para actualizar el listado en la interfaz sin recargar la pestaña
                cargarTabla();
                // 2º Muestra el mensaje recibido desde PHP en una ventana de alerta emergente
                alert(mensaje);
            });
    }
}
