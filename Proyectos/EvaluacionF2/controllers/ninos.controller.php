<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/ninos.model.php');
error_reporting(0); // TODO: Deshabilitar errores, dejar comentado si deseas mostrar el error

$ninos = new Ninos;

switch ($_GET["op"]) {

    case 'todos': //TODO: Procedimiento para cargar todos los datos de los niños
        $datos = array();
        $datos = $ninos->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // TODO: Obtener un niño por su ID
        $nino_id = $_POST["nino_id"];
        $datos = array();
        $datos = $ninos->uno($nino_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // TODO: Insertar un nuevo niño
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $fecha_nacimiento = $_POST["fecha_nacimiento"];
        $alergias = $_POST["alergias"];
        $estado = isset($_POST["estado"]) ? $_POST["estado"] : 1; // Por defecto activo (1)
        
        $datos = array();
        $datos = $ninos->insertar($nombre, $apellido, $fecha_nacimiento, $alergias, $estado);
        echo json_encode($datos);
        break;

    case 'actualizar': // TODO: Actualizar un niño
        $nino_id = $_POST["nino_id"];
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $fecha_nacimiento = $_POST["fecha_nacimiento"];
        $alergias = $_POST["alergias"];
        $estado = $_POST["estado"];
        
        $datos = array();
        $datos = $ninos->actualizar($nino_id, $nombre, $apellido, $fecha_nacimiento, $alergias, $estado);
        echo json_encode($datos);
        break;

    case 'eliminar': // TODO: Eliminar un niño
        $nino_id = $_POST["nino_id"];
        $datos = array();
        $datos = $ninos->eliminar($nino_id);
        echo json_encode($datos);
        break;
}
?>
