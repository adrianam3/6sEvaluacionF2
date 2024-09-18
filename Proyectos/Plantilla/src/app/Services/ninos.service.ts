import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INinos } from '../Interfaces/INinos';

@Injectable({
  providedIn: 'root'
})
export class NinosService {
  apiurl = 'http://localhost/6sEvaluacionF2/Proyectos/EvaluacionF2/controllers/ninos.controller.php?op=';


  constructor(private lector: HttpClient) {}

  // Obtener todos los niños
  todos(): Observable<INinos[]> {
    console.log(this.lector.get<INinos[]>(this.apiurl + 'todos'));
    return this.lector.get<INinos[]>(this.apiurl + 'todos');
  }

  // Obtener un niño por ID
  uno(nino_id: number): Observable<INinos> {
    const formData = new FormData();
    formData.append('nino_id', nino_id.toString());
    return this.lector.post<INinos>(this.apiurl + 'uno', formData);
  }

  // Eliminar un niño por ID
  eliminar(nino_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('nino_id', nino_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Insertar un nuevo niño
  insertar(nino: INinos): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', nino.nombre);
    formData.append('apellido', nino.apellido);
    formData.append('fecha_nacimiento', nino.fecha_nacimiento);
    formData.append('alergias', nino.alergias);
    formData.append('estado', nino.estado.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  // Actualizar un niño
  actualizar(nino: INinos): Observable<string> {
    const formData = new FormData();
    formData.append('nino_id', nino.nino_id?.toString() || '');
    formData.append('nombre', nino.nombre);
    formData.append('apellido', nino.apellido);
    formData.append('fecha_nacimiento', nino.fecha_nacimiento);
    formData.append('alergias', nino.alergias);
    formData.append('estado', nino.estado.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
