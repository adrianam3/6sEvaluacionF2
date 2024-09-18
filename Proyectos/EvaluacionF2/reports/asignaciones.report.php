<?php
//ob_start(); // Iniciar el buffer de salida para prevenir salidas no deseadas

// Habilitar CORS
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // Manejar las solicitudes OPTIONS que Angular envía automáticamente
}


require('fpdf/fpdf.php');
require_once("../models/asignaciones.model.php");

header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="ReporteAsignaciones.pdf"');


// para imprimir en horizontal 'L' 
$pdf = new FPDF('L', 'mm', 'A4');  
$pdf->AddPage();

// Reducir márgenes
$pdf->SetMargins(10, 10, 10);

$asignacionModel = new Asignaciones();
$asignaciones = $asignacionModel->todos();  // todas las asignaciones desde el modelo

// Se genera función para decodificar texto a ISO-8859-1 ya que las tildes salen con simbolos raros
function dec($texto) {
    return utf8_decode($texto);
}

// Función para truncar texto (si es necesario), para evitar que se monten los textos en otras celdas adyacentes
function truncarTexto($texto, $maxLongitud) {
    return (strlen($texto) > $maxLongitud) ? substr($texto, 0, $maxLongitud) . '...' : $texto;
}

// Obtener la fecha actual para añadir a fecha de impresión en el encabezado del reporte
$fechaActual = date('Y/m/d');

// Logo de la empresa
$pdf->Image('../public/images/saeta.png', 10, 10, 30);
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(277, 8, dec('EMPRESA XYZ S.A.'), 0, 1, 'C');  

// Información de la empresa
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(277, 5, dec('Dir. Matriz: AV. PRINCIPAL 123 y LA QUE CRUZA'), 0, 1, 'C');
$pdf->Cell(277, 5, dec('RUC: 1234567890001'), 0, 1, 'C');


// Imprimir la fecha actual
//$pdf->Ln(5);  // Espacio antes de la fecha
$pdf->SetFont('Arial', 'I', 10);
$pdf->Cell(277, 5, dec('Fecha de Impresión: ') . $fechaActual, 0, 1, 'R');  // Imprimir la fecha alineada a la derecha
$pdf->Ln(5);  // añadir un espacio

// Título del reporte
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(277, 10, dec('Reporte de Asignaciones'), 0, 1, 'C');
$pdf->Ln(5);  // añadir espacio 

// Encabezados de la tabla
$pdf->SetFont('Arial', 'B', 8);
$pdf->Cell(15, 7, 'Sec.', 1);  // Columna de secuencial 
$pdf->Cell(55, 7, dec('Nombre del Niño'), 1);  // Columna de Nombre del Niño
$pdf->Cell(50, 7, dec('Alergias del Niño'), 1);  // Columna de Alergias del Niño
$pdf->Cell(55, 7, dec('Nombre del Cuidador'), 1);  // Columna de Cuidador 
$pdf->Cell(50, 7, dec('Especialidad del Cuidador'), 1);  // Columna de Especialidad del Cuidador
$pdf->Cell(35, 7, dec('Fecha Asignacion'), 1);  // Columna de Fecha de Asignación
$pdf->Cell(17, 7, dec('Estado'), 1);  // Columna de Estado 
$pdf->Ln();

// Cargar los datos de las asignaciones
$pdf->SetFont('Arial', '', 8);
$index = 1;
if ($asignaciones && mysqli_num_rows($asignaciones) > 0) {
    // Recorrer todas las asignaciones
    while ($asignacion = mysqli_fetch_assoc($asignaciones)) {
        $pdf->Cell(15, 7, $index, 1);  // Columna de secuencial
        $pdf->Cell(55, 7, dec(truncarTexto($asignacion['nombreNino'], 40)), 1);  // Nombre del Niño
        $pdf->Cell(50, 7, dec(truncarTexto($asignacion['alergiasNino'], 40)), 1);  // Alergias del Niño
        $pdf->Cell(55, 7, dec(truncarTexto($asignacion['nombreCuidador'], 40)), 1);  // Nombre del Cuidador
        $pdf->Cell(50, 7, dec(truncarTexto($asignacion['especialidadCuidador'], 40)), 1);  // Especialidad del Cuidador
        $pdf->Cell(35, 7, dec($asignacion['fecha_asignacion']), 1);  // Fecha de Asignación

        // Columna de Estado (activo o inactivo)
        $estado = ($asignacion['estado'] == 1) ? 'Activo' : 'Inactivo';
        $pdf->Cell(17, 7, dec($estado), 1);  // Columna de Estado 

        $pdf->Ln();
        $index++;
    }
} else {
    // Si no hay asignaciones, mostrar mensaje 
    $pdf->Ln(10);
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, dec('No se encontraron asignaciones'), 0, 1, 'C');
}

// Imprimir pie de página
//$pdf->SetY(-15);
$pdf->SetFont('Arial', 'I', 8);
$pdf->Cell(0, 10, dec('Página ') . $pdf->PageNo(), 0, 0, 'R');

//ob_clean();  // Limpiar cualquier salida previa
$pdf->Output('I', 'ReporteAsignaciones.pdf');
