import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TareasService } from './services/tareas.service';
import { FormsModule } from '@angular/forms';
import { Tarea } from './interfaces/Tarea';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppTareas';

  listaTareas: Tarea[] = [];
  isUpdatedFormActive = false;
  isResultLoaded = false;

  nombreTarea = '';

  IDTareaActual = 0;


  constructor(private tareasService: TareasService){
     this.tareasService.getTareas().subscribe({
      next: (data) => {
        this.listaTareas = data;
       
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isResultLoaded = true;
      }
     }
    );
  }

  obtenerTareas(tarea: Tarea): void {
    this.isUpdatedFormActive = true;
    this.nombreTarea = tarea.nombre;
    this.IDTareaActual = tarea.idTarea;
  }


  agregarTarea(): void {
    const tarea: Tarea = {
      idTarea: 0,
      nombre: this.nombreTarea
    }
    this.tareasService.postTarea(tarea).subscribe({
      next: (data) => {
        this.listaTareas.push(data);
        this.getTareas();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getTareas(): void {
    this.tareasService.getTareas().subscribe({
      next: (data) => {
        this.listaTareas = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateTarea(): void {
    const tarea = {
      idTarea: this.IDTareaActual,
      nombre: this.nombreTarea
    }
    
    this.tareasService.putTarea(tarea).subscribe({
      next: (data) => {
        this.listaTareas.push(data);
        this.getTareas();
       
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  guardarTarea(): void {
    if(this.IDTareaActual === 0){
      this.agregarTarea();
    }
    else{
      this.updateTarea();
    }
    this.IDTareaActual = 0;
    this.nombreTarea = "";
  }

  deleteTarea(id: number): void {
    this.tareasService.deleteTarea(id).subscribe({
      next: (data) => {
        this.getTareas();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
