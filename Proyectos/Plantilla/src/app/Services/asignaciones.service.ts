import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAsignaciones } from '../Interfaces/IAsignaciones';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {
  apiurl = 'http://localhost/6sEvaluacionF2/Proyectos/EvaluacionF2/controllers/asignaciones.controller.php?op=';
  apiUrl = 'http://localhost/6sEvaluacionF2/Proyectos/EvaluacionF2/reports/asignaciones.report.php';

  constructor(private http: HttpClient) {}

  todos(): Observable<IAsignaciones[]> {
    return this.http.get<IAsignaciones[]>(this.apiurl + 'todos');
  }
  uno(asignacion_id: number): Observable<IAsignaciones> {
    const formData = new FormData();
    formData.append('asignacion_id', asignacion_id.toString());
    return this.http.post<IAsignaciones>(this.apiurl + 'uno', formData);
  }

  eliminar(asignacion_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('asignacion_id', asignacion_id.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(asignacion: IAsignaciones): Observable<string> {
    const formData = new FormData();
    formData.append('nino_id', asignacion.nino_id.toString());
    formData.append('cuidador_id', asignacion.cuidador_id.toString());
    formData.append('fecha_asignacion', asignacion.fecha_asignacion);
    formData.append('estado', asignacion.estado.toString());
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(asignacion: IAsignaciones): Observable<string> {
    const formData = new FormData();
    formData.append('asignacion_id', asignacion.asignacion_id.toString());
    formData.append('nino_id', asignacion.nino_id.toString());
    formData.append('cuidador_id', asignacion.cuidador_id.toString());
    formData.append('fecha_asignacion', asignacion.fecha_asignacion);
    formData.append('estado', asignacion.estado.toString());
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }
    // Método para generar el reporte
    generarReporteAsignaciones(): Observable<Blob> {
      return this.http.get(this.apiUrl, { responseType: 'blob' });
    }
}
