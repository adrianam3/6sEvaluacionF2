import { Component, OnInit } from '@angular/core';
import { IAsignaciones } from '../Interfaces/IAsignaciones';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { AsignacionesService } from '../Services/asignaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './asignaciones.component.html',
  styleUrl: './asignaciones.component.scss'
})
export class AsignacionesComponent implements OnInit {
  listaAsignaciones: IAsignaciones[] = [];

  constructor(private asignacionesService: AsignacionesService) {}

  ngOnInit(): void {
    this.cargarAsignaciones();
  }

  cargarAsignaciones() {
    this.asignacionesService.todos().subscribe((data) => {
      this.listaAsignaciones = data;
    });
  }

  eliminar(asignacion_id: number) {
    Swal.fire({
      title: 'Eliminar Asignación',
      text: '¿Está seguro de que desea eliminar esta asignación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignacionesService.eliminar(asignacion_id).subscribe((res: any) => {
          console.log(res);
          this.cargarAsignaciones();
          Swal.fire({
            title: 'Asignación Eliminada',
            text: res.mensaje || 'La asignación ha sido eliminada exitosamente',
            icon: 'success',
            showConfirmButton: true,
            // timer: 1500
          });
        });
      }
    });
  }

// Método para imprimir el reporte de asignaciones
imprimirAsignaciones(): void {
  this.asignacionesService.generarReporteAsignaciones().subscribe(response => {
    const url = window.URL.createObjectURL(response);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ReporteAsignaciones.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }, error => {
    Swal.fire('Error', 'Hubo un problema al generar el reporte', 'error');
  });
}


}
