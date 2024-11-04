<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "misproyectos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(array('error' => 'Conexión fallida: ' . $conn->connect_error)));
}

// Consulta para obtener proyectos
$sql = "SELECT IdProyecto, Nombre, Descripcion, foto FROM proyectos";
$result = $conn->query($sql);

$projects = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Asegúrate de que el campo 'foto' contenga datos binarios de imagen
        if (!empty($row['foto'])) {
            $tipoImagen = "image/jpeg"; // Cambia esto según el tipo de imagen (jpeg, png, etc.)
            $row['foto'] = 'data:' . $tipoImagen . ';base64,' . base64_encode($row['foto']);
        } else {
            // Manejar el caso en que no hay imagen
            $row['foto'] = 'ruta/por/defecto/imagen.png'; // Ruta a una imagen por defecto
        }
        $projects[] = $row;
    }
} else {
    echo json_encode(array('error' => 'No se encontraron proyectos.'));
}

// Devolver JSON
header('Content-Type: application/json');
echo json_encode($projects);

// Cerrar conexión
$conn->close();
?>
