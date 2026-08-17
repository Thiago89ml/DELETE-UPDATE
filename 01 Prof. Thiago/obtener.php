<?php
// Abre la etiqueta de PHP para procesar el código en el servidor
// Configura la cabecera HTTP para informarle al navegador que la respuesta será en formato JSON
header('Content-Type: application/json');

// Establece la conexión a la base de datos MySQL (servidor: localhost, usuario: root, sin contraseña, BD: turismo)
$conexion = new mysqli("localhost", "root", "", "turismo");

// Comprueba si ocurrió algún error durante el intento de conexión a la base de datos
if ($conexion->connect_errno) {
    // Si falla la conexión, retorna un arreglo JSON vacío [] a JavaScript
    echo json_encode([]);
    // Corta y finaliza la ejecución del script inmediatamente
    exit();
}

// Prepara la consulta SQL para seleccionar todos los campos y filas de la tabla 'registros'
$sql = "SELECT * FROM registros";
// Ejecuta la consulta en la base de datos y almacena el objeto de resultados
$resultado = $conexion->query($sql);

// Crea un arreglo asociativo vacío para ir guardando cada registro devuelto
$registros = [];
// Recorre los resultados fila por fila convirtiendo cada registro en un arreglo asociativo (clave => valor)
while ($fila = $resultado->fetch_assoc()) {
    // Inserta la fila actual dentro del arreglo $registros
    $registros[] = $fila;
}

// Convierte el arreglo $registros a un string en formato JSON y lo envía como respuesta a JavaScript
echo json_encode($registros);

// Cierra la conexión con la base de datos para liberar recursos del servidor
$conexion->close();
?>
$conexion->close();
?>
