import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NinosService } from '../../Services/ninos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { INinos } from '../../Interfaces/INinos';

@Component({
  selector: 'app-nuevonino',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevonino.component.html',
  styleUrl: './nuevonino.component.scss'
})
export class NuevoninoComponent implements OnInit {
  titulo = 'Nuevo Niño';
  frm_Nino: FormGroup;
  nino_id = 0;

  constructor(
    private ninosService: NinosService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.nino_id = parseInt(this.ruta.snapshot.paramMap.get('ninoId'));
    
    this.frm_Nino = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      fecha_nacimiento: new FormControl('', [Validators.required]),
      alergias: new FormControl(''),
      estado: new FormControl(1)
    });

    // cuando es edicion
    if (this.nino_id > 0) {
      this.ninosService.uno(this.nino_id).subscribe((unNino) => {
        this.frm_Nino.controls['nombre'].setValue(unNino.nombre);
        this.frm_Nino.controls['apellido'].setValue(unNino.apellido);
        this.frm_Nino.controls['fecha_nacimiento'].setValue(unNino.fecha_nacimiento);
        this.frm_Nino.controls['alergias'].setValue(unNino.alergias);
        this.frm_Nino.controls['estado'].setValue(unNino.estado);
        this.titulo = 'Editar Niño';
      });
    }
  }

  grabar() {
    let nino: INinos = {
      nombre: this.frm_Nino.get('nombre')?.value,
      apellido: this.frm_Nino.get('apellido')?.value,
      fecha_nacimiento: this.frm_Nino.get('fecha_nacimiento')?.value,
      alergias: this.frm_Nino.get('alergias')?.value,
      estado: this.frm_Nino.get('estado')?.value,
      nino_id: this.nino_id > 0 ? this.nino_id : undefined
    };

    Swal.fire({
      title: 'Guardar Niño',
      text: '¿Desea guardar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.nino_id > 0) {
          // actualiza
          this.ninosService.actualizar(nino).subscribe((x) => {
            Swal.fire('Éxito', 'El niño se modificó con éxito', 'success');
            this.navegacion.navigate(['/ninos']);
          });
        } else {
          // inserta
          this.ninosService.insertar(nino).subscribe((x) => {
            Swal.fire('Éxito', 'El niño se guardó con éxito', 'success');
            this.navegacion.navigate(['/ninos']);
          });
        }
      }
    });
  }
}
