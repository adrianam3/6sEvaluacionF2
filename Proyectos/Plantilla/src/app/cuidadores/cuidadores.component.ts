import { Component, OnInit } from '@angular/core';
import { ICuidador } from '../Interfaces/ICuidadores';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { CuidadoresService } from '../Services/cuidadores.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuidadores',
  standalone: true,
  imports: [RouterLink, SharedModule, CommonModule],
  templateUrl: './cuidadores.component.html',
  styleUrl: './cuidadores.component.scss'
})
export class CuidadoresComponent implements OnInit {
  listaCuidadores: ICuidador[] = [];

  constructor(private cuidadoresService: CuidadoresService) {}

  ngOnInit(): void {
    this.cargarCuidadores();
  }

  cargarCuidadores() {
    this.cuidadoresService.todos().subscribe((data) => {
      console.log(data);
      this.listaCuidadores = data;
    });
  }

  eliminar(cuidador_id: number) {
    Swal.fire({
      title: 'Eliminar Cuidador',
      text: '¿Está seguro de que desea eliminar este cuidador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuidadoresService.eliminar(cuidador_id).subscribe((res: any) => {
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
            this.cargarCuidadores(); // Refrescar la lista de cuidadores
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
  
  // eliminar(cuidador_id: number) {
  //   Swal.fire({
  //     title: 'Eliminar Cuidador',
  //     text: '¿Está seguro de que desea eliminar este registro?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Eliminar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.cuidadoresService.eliminar(cuidador_id).subscribe((res: any) => {
  //         console.log(res);
  //         this.cargarCuidadores();
  //         Swal.fire({
  //           title: 'Registro Eliminado',
  //           text: res.mensaje || 'El cuidador ha sido eliminado exitosamente',
  //           icon: 'success',
  //           showConfirmButton: true,
  //           // timer: 1500
  //         });
  //       });
  //     }
  //   });
  // }
}
