import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICuidador } from '../Interfaces/ICuidadores';

@Injectable({
  providedIn: 'root'
})
export class CuidadoresService {
  // URL base de la API para el controlador de Cuidadores
  apiurl = 'http://localhost/6sEvaluacionF2/Proyectos/EvaluacionF2/controllers/cuidadores.controller.php?op=';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los cuidadores
  todos(): Observable<ICuidador[]> {
    return this.http.get<ICuidador[]>(this.apiurl + 'todos');
  }

  // Método para obtener un cuidador por su ID
  uno(cuidador_id: number): Observable<ICuidador> {
    const formData = new FormData();
    formData.append('cuidador_id', cuidador_id.toString());
    return this.http.post<ICuidador>(this.apiurl + 'uno', formData);
  }

  // Método para eliminar un cuidador
  eliminar(cuidador_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('cuidador_id', cuidador_id.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Método para insertar un nuevo cuidador
  insertar(cuidador: ICuidador): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', cuidador.nombre);
    formData.append('especialidad', cuidador.especialidad);
    formData.append('telefono', cuidador.telefono);
    formData.append('email', cuidador.email);
    formData.append('estado', cuidador.estado.toString());
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  // Método para actualizar un cuidador existente
  actualizar(cuidador: ICuidador): Observable<string> {
    const formData = new FormData();
    formData.append('cuidador_id', cuidador.cuidador_id.toString());
    formData.append('nombre', cuidador.nombre);
    formData.append('especialidad', cuidador.especialidad);
    formData.append('telefono', cuidador.telefono);
    formData.append('email', cuidador.email);
    formData.append('estado', cuidador.estado.toString());
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }
}
