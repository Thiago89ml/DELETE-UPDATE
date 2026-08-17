<?php
// Conecta PHP con la base de datos "turismo".
$conexion = new mysqli("localhost", "root", "", "turismo");

// Comprueba si ocurrió un error al conectar.
if ($conexion->connect_errno) {
    // Devuelve un JSON vacío.
    echo json_encode([]);

    // Detiene la ejecución del programa.
    exit();
} 

$datos = json_decode(file_get_contents("php://input"), true); // * 1.

$actNombre = $datos["actNombre"]; // * 2.

$newNombre = $datos["newNombre"]; // * 3.

$sql = "UPDATE registros SET nombre = ? WHERE nombre = ?"; // * 4.

$stmt = $conexion->prepare($sql); // * 5.

$stmt->bind_param("ss", $newNombre, $actNombre); // * 6.

$stmt->execute(); // * 7.

echo json_encode([ 
    "success" => true 
]); // * 8.

$conexion->close(); // Cierra la conexión con la base de datos.

/*
    1. Obtiene el JSON enviado y lo convierte en un array de PHP.
    2. Obtiene el nombre actual enviado desde JavaScript.
    3. Obtiene el nuevo nombre enviado desde JavaScript.
    4. Define la consulta SQL para cambiar el nombre.
    5. Prepara la consulta SQL para ejecutarla de forma segura.
    6. Reemplaza los ? con el nuevo nombre y el nombre actual.
    7. Ejecuta la consulta SQL.
    8. Devuelve un JSON indicando que la operación fue exitosa.
*/
?>