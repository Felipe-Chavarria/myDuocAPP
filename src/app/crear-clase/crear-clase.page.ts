import { Component, OnInit } from '@angular/core';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { CrearClase } from '../models/clase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.page.html',
  styleUrls: ['./crear-clase.page.scss'],
})
export class CrearClasePage implements OnInit {
  public fecha: string = '';
  public hora_inicio: string = '';
  public hora_termino: string = '';
  private idCurso: number | undefined; // ID del curso obtenido desde la URL

  constructor(
    private api: ProveedorCursosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el ID del curso desde la URL
    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));
  }

  enviarFormulario(form: CrearClase): void {
    if (!this.idCurso) {
      alert('ID del curso no especificado');
      return;
    }

    this.api.crearClase(this.idCurso, form).subscribe(
      (response : any) => {
        if (response.message === 'Clase creada exitosamente') {
          alert('Clase creada con éxito. ID: ' + response.id);
        } else if (response.message === 'No autenticado') {
          alert('Debe iniciar sesión para realizar esta acción.');
        } else if (response.message === 'Curso no encontrado') {
          alert('El curso no fue encontrado.');
        }
      },
      (error) => {
        console.error('Error al crear la clase:', error);
        alert('Ocurrió un error inesperado al crear la clase.');
      }
    );
  }
}
