<?php
$conexion = new mysqli("localhost", "root", "", "turismo");

if ($conexion->connect_errno) {
    echo json_encode([]);
    exit();
}

$sql = "SELECT nombre, codPostal, contacto FROM registros";
$resultado = $conexion->query($sql);

$registros = [];
while ($fila = $resultado->fetch_assoc()) {
    $registros[] = $fila;
}

// Devuelve los datos como texto JSON plano
echo json_encode($registros);

$conexion->close();
?>