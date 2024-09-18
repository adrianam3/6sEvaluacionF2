<?php
//TODO: Clase de Cuidadores
require_once('../config/config.php');

class Cuidadores
{
    //TODO: Implementar los métodos de la clase

    public function todos() //select * from cuidadores
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `cuidadores`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($cuidador_id) //select * from cuidadores where cuidador_id = $cuidador_id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `cuidadores` WHERE `cuidador_id`=$cuidador_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $especialidad, $telefono, $email, $estado) //INSERT INTO `cuidadores` ...
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `cuidadores` (`nombre`, `especialidad`, `telefono`, `email`, `estado`) VALUES ('$nombre', '$especialidad', '$telefono', '$email', '$estado')";
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

    public function actualizar($cuidador_id, $nombre, $especialidad, $telefono, $email, $estado) //UPDATE `cuidadores` SET ...
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `cuidadores` SET `nombre`='$nombre', `especialidad`='$especialidad', `telefono`='$telefono', `email`='$email', `estado`='$estado' WHERE `cuidador_id` = $cuidador_id";
            if (mysqli_query($con, $cadena)) {
                return $cuidador_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($cuidador_id) {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
    
            // Verificar si existen asignaciones relacionadas con el cuidador
            $query = "SELECT COUNT(*) as total FROM asignaciones WHERE cuidador_id = $cuidador_id";
            $result = mysqli_query($con, $query);
            $row = mysqli_fetch_assoc($result);
    
            if ($row['total'] > 0) {
                // Si el cuidador tiene asignaciones, devolver un mensaje de error
                return [
                    'status' => 'error',
                    'message' => 'No se puede eliminar al cuidador porque tiene asignaciones asociadas.'
                ];
            } else {
                // Si no tiene asignaciones, proceder con la eliminación
                $cadena = "DELETE FROM cuidadores WHERE cuidador_id = $cuidador_id";
                if (mysqli_query($con, $cadena)) {
                    return [
                        'status' => 'success',
                        'message' => 'El cuidador ha sido eliminado correctamente.'
                    ];
                } else {
                    return [
                        'status' => 'error',
                        'message' => 'Error al intentar eliminar el cuidador.'
                    ];
                }
            }
        } catch (Exception $th) {
            return [
                'status' => 'error',
                'message' => $th->getMessage()
            ];
        } finally {
            $con->close();
        }
    }
    
    // public function eliminar($cuidador_id) //DELETE FROM `cuidadores` WHERE cuidador_id = ...
    // {
    //     try {
    //         $con = new ClaseConectar();
    //         $con = $con->ProcedimientoParaConectar();
    //         $cadena = "DELETE FROM `cuidadores` WHERE `cuidador_id`= $cuidador_id";
    //         if (mysqli_query($con, $cadena)) {
    //             return 1;
    //         } else {
    //             return $con->error;
    //         }
    //     } catch (Exception $th) {
    //         return $th->getMessage();
    //     } finally {
    //         $con->close();
    //     }
    // }
}
?>
