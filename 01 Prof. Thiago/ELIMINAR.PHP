<?php
$conexion = new mysqli("localhost", "root", "", "turismo");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $conexion->real_escape_string($_POST['id_reserva'] ?? '');

    $sql = "DELETE FROM registros WHERE id = '$id'";

    if ($conexion->query($sql) === TRUE) {
        echo "¡Registro eliminado con éxito!";
    } else {
        echo "Error al eliminar: " . $conexion->error;
    }
}

$conexion->close();
?>