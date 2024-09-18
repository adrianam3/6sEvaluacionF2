<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/cuidadores.model.php');
error_reporting(0); // TODO: Deshabilitar errores, dejar comentado si deseas mostrar el error

$cuidadores = new Cuidadores;

switch ($_GET["op"]) {

    case 'todos': //TODO: Procedimiento para cargar todos los cuidadores
        $datos = array();
        $datos = $cuidadores->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // TODO: Obtener un cuidador por su ID
        $cuidador_id = $_POST["cuidador_id"];
        $datos = array();
        $datos = $cuidadores->uno($cuidador_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // TODO: Insertar un nuevo cuidador
        $nombre = $_POST["nombre"];
        $especialidad = $_POST["especialidad"];
        $telefono = $_POST["telefono"];
        $email = $_POST["email"];
        $estado = isset($_POST["estado"]) ? $_POST["estado"] : 1; // Por defecto activo (1)
        
        $datos = array();
        $datos = $cuidadores->insertar($nombre, $especialidad, $telefono, $email, $estado);
        echo json_encode($datos);
        break;

    case 'actualizar': // TODO: Actualizar un cuidador
        $cuidador_id = $_POST["cuidador_id"];
        $nombre = $_POST["nombre"];
        $especialidad = $_POST["especialidad"];
        $telefono = $_POST["telefono"];
        $email = $_POST["email"];
        $estado = $_POST["estado"];
        
        $datos = array();
        $datos = $cuidadores->actualizar($cuidador_id, $nombre, $especialidad, $telefono, $email, $estado);
        echo json_encode($datos);
        break;

    case 'eliminar': // TODO: Eliminar un cuidador
        $cuidador_id = $_POST["cuidador_id"];
        $datos = array();
        $datos = $cuidadores->eliminar($cuidador_id);
        echo json_encode($datos);
        break;
}
?>
