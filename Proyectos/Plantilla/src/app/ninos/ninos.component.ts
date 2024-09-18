import { Component, OnInit } from '@angular/core';
import { INinos } from '../Interfaces/INinos';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { NinosService } from '../Services/ninos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ninos',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './ninos.component.html',
  styleUrl: './ninos.component.scss'
})
export class NinosComponent implements OnInit {
  listaNinos: INinos[] = [];

  constructor(private ninosService: NinosService) {}

  ngOnInit(): void {
    this.cargarNinos();
  }

  cargarNinos() {
    this.ninosService.todos().subscribe((data) => {
      console.log(data);
      this.listaNinos = data;
    });
  }


  eliminar(nino_id: number) {
    Swal.fire({
      title: 'Eliminar Niño',
      text: '¿Está seguro de que desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ninosService.eliminar(nino_id).subscribe((res: any) => {
          if (res.status === 'error') {
            // Mostrar el mensaje de error si no se puede eliminar
            Swal.fire({
              title: 'Error',
              text: res.message,
              icon: 'error',
              showConfirmButton: true
            });
          } else {
            // Si se elimina correctamente
            this.cargarNinos(); // Refrescar la lista de niños
            Swal.fire({
              title: 'Registro Eliminado',
              text: res.message,
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }
  

  // eliminar(nino_id: number) {
  //   Swal.fire({
  //     title: 'Eliminar Niño',
  //     text: '¿Está seguro de que desea eliminar este registro?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Eliminar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.ninosService.eliminar(nino_id).subscribe((res: any) => {
  //         console.log(res);
  //         this.cargarNinos();
  //         Swal.fire({
  //           title: 'Registro Eliminado',
  //           text: res.mensaje || 'El niño ha sido eliminado exitosamente',
  //           icon: 'success',
  //           showConfirmButton: true
  //           // timer: 1500
  //         });
  //       });
  //     }
  //   });
  // }
}
