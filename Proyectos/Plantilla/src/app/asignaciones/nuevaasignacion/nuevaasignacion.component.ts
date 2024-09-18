import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NinosService } from '../../Services/ninos.service';
import { CuidadoresService } from '../../Services/cuidadores.service';
import { AsignacionesService } from '../../Services/asignaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { INinos } from '../../Interfaces/INinos';
import { ICuidador } from '../../Interfaces/ICuidadores';
import { IAsignaciones } from '../../Interfaces/IAsignaciones';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevaasignacion',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevaasignacion.component.html',
  styleUrl: './nuevaasignacion.component.scss'
})
export class NuevaAsignacionComponent implements OnInit {
  titulo = 'Nueva Asignación';
  frm_Asignacion: FormGroup;
  asignacion_id = 0;
  listaNinos: INinos[] = [];
  listaCuidadores: ICuidador[] = [];

  constructor(
    private ninosService: NinosService,
    private cuidadoresService: CuidadoresService,
    private asignacionesService: AsignacionesService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.asignacion_id = parseInt(this.ruta.snapshot.paramMap.get('asignacionId'), 10);
    
    this.frm_Asignacion = new FormGroup({
      nino_id: new FormControl('', [Validators.required]),
      cuidador_id: new FormControl('', [Validators.required]),
      fecha_asignacion: new FormControl('', [Validators.required]),
      estado: new FormControl(1, [Validators.required]) 
    });

    this.cargarListas();

    // actualizacion
    if (this.asignacion_id > 0) {
      this.asignacionesService.uno(this.asignacion_id).subscribe((asignacion) => {
        this.frm_Asignacion.controls['nino_id'].setValue(asignacion.nino_id);
        this.frm_Asignacion.controls['cuidador_id'].setValue(asignacion.cuidador_id);
        this.frm_Asignacion.controls['fecha_asignacion'].setValue(asignacion.fecha_asignacion);
        this.frm_Asignacion.controls['estado'].setValue(asignacion.estado);
        this.titulo = 'Editar Asignación';
      });
    }
  }

  cargarListas() {
    // niños
    this.ninosService.todos().subscribe((ninos) => {
      this.listaNinos = ninos;
    });

    // cuidadores
    this.cuidadoresService.todos().subscribe((cuidadores) => {
      this.listaCuidadores = cuidadores;
    });
  }

  grabar() {
    let asignacion: IAsignaciones = {
      nino_id: this.frm_Asignacion.get('nino_id')?.value,
      cuidador_id: this.frm_Asignacion.get('cuidador_id')?.value,
      fecha_asignacion: this.frm_Asignacion.get('fecha_asignacion')?.value,
      estado: this.frm_Asignacion.get('estado')?.value,
      asignacion_id: this.asignacion_id > 0 ? this.asignacion_id : undefined,
      nombre: '',
      apellido: '',
      nombreNino: '',
      alergiasNino: '',
      nombreCuidador: '',
      especialidadCuidador: ''
    };

    Swal.fire({
      title: 'Guardar Asignación',
      text: '¿Desea guardar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.asignacion_id > 0) {
          // actualizat
          this.asignacionesService.actualizar(asignacion).subscribe(() => {
            Swal.fire('Éxito', 'La asignación se modificó con éxito', 'success');
            this.navegacion.navigate(['/asignaciones']);
          });
        } else {
          // insertar
          this.asignacionesService.insertar(asignacion).subscribe(() => {
            Swal.fire('Éxito', 'La asignación se guardó con éxito', 'success');
            this.navegacion.navigate(['/asignaciones']);
          });
        }
      }
    });
  }
}
