<?php
// Abre la etiqueta de PHP para procesar el código en el servidor
// Se conecta a la base de datos MySQL (servidor: localhost, usuario: root, sin clave, BD: turismo)
$conexion = new mysqli("localhost", "root", "", "turismo");

// Comprueba si se envió el parámetro 'id' a través de la URL (petición GET de JS)
if (isset($_GET['id'])) {
    // Limpia y escapa el valor de 'id' para evitar caracteres extraños e inyecciones SQL
    $id = $conexion->real_escape_string($_GET['id']);

    // Define la instrucción SQL para borrar el registro cuyo ID coincida con el recibido
    $sql = "DELETE FROM registros WHERE id = '$id'";

    // Ejecuta la consulta SQL en MySQL y valida si la operación resultó exitosa
    if ($conexion->query($sql) === TRUE) {
        // Retorna este mensaje en texto plano a JavaScript (lo recibe el alert del frontend)
        echo "¡Registro eliminado con éxito!";
    } else {
        // En caso de fallo en la BD, muestra la causa del error reportada por MySQL
        echo "Error al eliminar: " . $conexion->error;
    }
}

// Cierra la conexión con la base de datos para liberar memoria y recursos del servidor
$conexion->close();
?>
