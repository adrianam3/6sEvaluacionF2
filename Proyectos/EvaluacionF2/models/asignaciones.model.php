<?php
//TODO: Clase de Asignaciones
require_once('../config/config.php');

class Asignaciones
{
    //TODO: Implementar los métodos de la clase

    public function todos() //select * from asignaciones
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        //$cadena = "SELECT * FROM `asignaciones`";
        $cadena = "SELECT 
        a.asignacion_id, a.nino_id, a.cuidador_id,a.estado
        , n.nombre, n.apellido, CONCAT(n.nombre, ' ', n.apellido) as nombreNino
        , n.alergias as alergiasNino
        , c.nombre as nombreCuidador, c.especialidad as especialidadCuidador
        , a.fecha_asignacion
        FROM `asignaciones` a 
        INNER JOIN `ninos` n ON a.nino_id = n.nino_id 
        INNER JOIN `cuidadores` c ON a.cuidador_id = c.cuidador_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($asignacion_id) //select * from asignaciones where asignacion_id = $asignacion_id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `asignaciones` WHERE `asignacion_id`=$asignacion_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nino_id, $cuidador_id, $fecha_asignacion, $estado) //INSERT INTO `asignaciones` ...
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `asignaciones` (`nino_id`, `cuidador_id`, `fecha_asignacion`, `estado`) VALUES ('$nino_id', '$cuidador_id', '$fecha_asignacion', '$estado')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($asignacion_id, $nino_id, $cuidador_id, $fecha_asignacion, $estado) //UPDATE `asignaciones` SET ...
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `asignaciones` SET `nino_id`='$nino_id', `cuidador_id`='$cuidador_id', `fecha_asignacion`='$fecha_asignacion', `estado`='$estado' WHERE `asignacion_id` = $asignacion_id";
            if (mysqli_query($con, $cadena)) {
                return $asignacion_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($asignacion_id) //DELETE FROM `asignaciones` WHERE asignacion_id = ...
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `asignaciones` WHERE `asignacion_id`= $asignacion_id";
            if (mysqli_query($con, $cadena)) {
                return 1;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
?>
