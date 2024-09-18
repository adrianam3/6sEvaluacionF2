<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/asignaciones.model.php');
error_reporting(0); // TODO: Deshabilitar errores, dejar comentado si deseas mostrar el error

$asignaciones = new Asignaciones;

switch ($_GET["op"]) {

    case 'todos': //TODO: Procedimiento para cargar todas las asignaciones
        $datos = array();
        $datos = $asignaciones->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // TODO: Obtener una asignación por su ID
        $asignacion_id = $_POST["asignacion_id"];
        $datos = array();
        $datos = $asignaciones->uno($asignacion_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // TODO: Insertar una nueva asignación
        $nino_id = $_POST["nino_id"];
        $cuidador_id = $_POST["cuidador_id"];
        $fecha_asignacion = $_POST["fecha_asignacion"];
        $estado = $_POST["estado"];
        
        $datos = array();
        $datos = $asignaciones->insertar($nino_id, $cuidador_id, $fecha_asignacion, $estado);
        echo json_encode($datos);
        break;

    case 'actualizar': // TODO: Actualizar una asignación
        $asignacion_id = $_POST["asignacion_id"];
        $nino_id = $_POST["nino_id"];
        $cuidador_id = $_POST["cuidador_id"];
        $fecha_asignacion = $_POST["fecha_asignacion"];
        $estado = $_POST["estado"];
        
        $datos = array();
        $datos = $asignaciones->actualizar($asignacion_id, $nino_id, $cuidador_id, $fecha_asignacion, $estado);
        echo json_encode($datos);
        break;

    case 'eliminar': // TODO: Eliminar una asignación
        $asignacion_id = $_POST["asignacion_id"];
        $datos = array();
        $datos = $asignaciones->eliminar($asignacion_id);
        echo json_encode($datos);
        break;
}
?>
