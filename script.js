// 1. Cuando carga la página, pide la tabla
document.addEventListener('DOMContentLoaded', cargarTabla);

function cargarTabla() {
    fetch('OBTENER.php')
        .then(res => res.json())
        .then(datos => {
            let html = '';
            
            // Recorre los datos y junta las filas
            for (let f of datos) {
                html += `<tr>
                    <td>${f.id}</td>
                    <td>${f.nombre}</td>
                    <td>${f.codPostal}</td>
                    <td>${f.contacto}</td>
                    <td><button onclick="eliminar(${f.id})">Eliminar</button></td>
                </tr>`;
            }
            
            // Si está vacío muestra un mensaje, si no, muestra las filas
            document.getElementById('tablaCuerpo').innerHTML = html || '<tr><td colspan="5">Sin datos</td></tr>';
        });
}

// 2. Función para eliminar
function eliminar(id) {
    if (confirm("¿Borrar registro?")) {
        fetch('ELIMINAR.php?id=' + id)
            .then(res => res.text())
            .then(mensaje => {
                cargarTabla(); // 1º Actualiza la tabla
                alert(mensaje); // 2º Muestra el mensaje
            });
    }
}