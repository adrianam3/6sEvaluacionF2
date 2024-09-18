import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ICuidador } from '../../Interfaces/ICuidadores';
import { CuidadoresService } from '../../Services/cuidadores.service';

@Component({
  selector: 'app-nuevocuidador',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevocuidador.component.html',
  styleUrl: './nuevocuidador.component.scss'
})
export class NuevocuidadorComponent implements OnInit {
  titulo = 'Nuevo Cuidador';
  frm_Cuidador: FormGroup;
  cuidador_id = 0;

  constructor(
    private cuidadoresService: CuidadoresService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cuidador_id = parseInt(this.ruta.snapshot.paramMap.get('cuidadorId'), 10);

    this.frm_Cuidador = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      especialidad: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      estado: new FormControl(1) 
    });
    // actualizar
    if (this.cuidador_id > 0) {
      this.cuidadoresService.uno(this.cuidador_id).subscribe((unCuidador) => {
        this.frm_Cuidador.controls['nombre'].setValue(unCuidador.nombre);
        this.frm_Cuidador.controls['especialidad'].setValue(unCuidador.especialidad);
        this.frm_Cuidador.controls['telefono'].setValue(unCuidador.telefono);
        this.frm_Cuidador.controls['email'].setValue(unCuidador.email);
        this.frm_Cuidador.controls['estado'].setValue(unCuidador.estado);
        this.titulo = 'Editar Cuidador';
      });
    }
  }

  grabar() {
    let cuidador: ICuidador = {
      cuidador_id: this.cuidador_id > 0 ? this.cuidador_id : undefined,
      nombre: this.frm_Cuidador.get('nombre')?.value,
      especialidad: this.frm_Cuidador.get('especialidad')?.value,
      telefono: this.frm_Cuidador.get('telefono')?.value,
      email: this.frm_Cuidador.get('email')?.value,
      estado: this.frm_Cuidador.get('estado')?.value
    };

    Swal.fire({
      title: 'Guardar Cuidador',
      text: '¿Desea guardar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.cuidador_id > 0) {
          // actualizar
          this.cuidadoresService.actualizar(cuidador).subscribe((x) => {
            Swal.fire('Éxito', 'El cuidador se modificó con éxito', 'success');
            this.navegacion.navigate(['/cuidadores']);
          });
        } else {
          // insertar
          this.cuidadoresService.insertar(cuidador).subscribe((x) => {
            Swal.fire('Éxito', 'El cuidador se guardó con éxito', 'success');
            this.navegacion.navigate(['/cuidadores']);
          });
        }
      }
    });
  }
}
