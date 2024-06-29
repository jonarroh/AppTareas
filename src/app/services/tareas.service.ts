import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/Tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private baseUrl = environment.endpoint;

  tareas: Tarea[] = []

  constructor(private http: HttpClient) { }

  getTareas():Observable<Tarea[]>{
    console.log(`la url es ${this.baseUrl}Tareas`);
    return this.http.get<Tarea[]>(`${this.baseUrl}Tareas`);
  }

  postTarea(tarea: Tarea):Observable<Tarea>{
    return this.http.post<Tarea>(`${this.baseUrl}Tareas`, tarea);
  }

  putTarea(tarea: Tarea):Observable<Tarea>{
    return this.http.put<Tarea>(`${this.baseUrl}Tareas/${tarea.idTarea}`, tarea);
  }

  deleteTarea(id: number):Observable<Tarea>{
    return this.http.delete<Tarea>(`${this.baseUrl}Tareas/${id}`);
  }
  
}
