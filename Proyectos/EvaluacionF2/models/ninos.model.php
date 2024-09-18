<?php
//TODO: Clase de Niños
require_once('../config/config.php');

class Ninos
{
    //TODO: Implementar los métodos de la clase

    public function todos() //select * from ninos
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `ninos`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($nino_id) //select * from ninos where nino_id = $nino_id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `ninos` WHERE `nino_id`=$nino_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $apellido, $fecha_nacimiento, $alergias, $estado) //INSERT INTO `ninos` ...
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `ninos` (`nombre`, `apellido`, `fecha_nacimiento`, `alergias`, `estado`) VALUES ('$nombre', '$apellido', '$fecha_nacimiento', '$alergias', '$estado')";
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

    public function actualizar($nino_id, $nombre, $apellido, $fecha_nacimiento, $alergias, $estado) //UPDATE `ninos` SET ...
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `ninos` SET `nombre`='$nombre', `apellido`='$apellido', `fecha_nacimiento`='$fecha_nacimiento', `alergias`='$alergias', `estado`='$estado' WHERE `nino_id` = $nino_id";
            if (mysqli_query($con, $cadena)) {
                return $nino_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($nino_id) //DELETE FROM `ninos` WHERE nino_id = ...
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `ninos` WHERE `nino_id`= $nino_id";
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
