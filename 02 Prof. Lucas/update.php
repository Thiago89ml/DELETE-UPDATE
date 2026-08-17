<?php
$conexion = new mysqli("localhost", "root", "", "turismo");

if ($conexion->connect_errno) {
    echo json_encode([]);
    exit();
}

$datos = json_decode(file_get_contents("php://input"), true);

$actNombre = $datos["actNombre"];
$newNombre = $datos["newNombre"];

$sql = "UPDATE registros SET nombre = ? WHERE nombre = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("ss", $newNombre, $actNombre);

$stmt->execute();

echo json_encode([
    "success" => true
]);

$conexion->close();
?>