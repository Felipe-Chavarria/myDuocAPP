import { Component, OnInit } from '@angular/core';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { CrearClase } from '../models/clase';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../providers/curso.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.page.html',
  styleUrls: ['./crear-clase.page.scss'],
})
export class CrearClasePage implements OnInit {
  public fecha: string = '';
  public hora_inicio: string = '';
  public hora_termino: string = '';
  public minFecha: string = ''; 
  private idCurso: number | null = null; 

  constructor(
    private api: ProveedorCursosService,
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private http: HttpClient 
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener el ID del curso desde el almacenamiento local
    this.idCurso = await this.cursoService.getCursoId(); 
    if (!this.idCurso) {
      alert('No se ha seleccionado un curso.');
    } else {
      console.log('ID del curso cargado:', this.idCurso);
    }

    // Inicializar minFecha con la fecha de hoy en formato "YYYY-MM-DD"
    const today = new Date();
    this.minFecha = today.toISOString().split('T')[0];
  }

  enviarFormulario(): void {
    if (!this.idCurso) {
      alert('ID del curso no especificado');
      return;
    }

    

    
    const url = `https://www.presenteprofe.cl/api/v1/cursos/${this.idCurso}/clase`;

    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Crear el objeto de formulario a enviar
    const form: CrearClase = {
      fecha: this.fecha,
      hora_inicio: this.hora_inicio,
      hora_termino: this.hora_termino
    };

    console.log('Datos enviados a la API:', form);

    // Enviar solicitud POST con los datos del formulario y encabezados
    this.http.post(url, form, { headers }).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response);
        if (response.message === 'Clase creada exitosamente') {
          alert('Clase creada con éxito.' );
        } else if (response.message === 'No autenticado') {
          alert('Debe iniciar sesión para realizar esta acción.');
        } else if (response.message === 'Curso no encontrado') {
          alert('El curso no fue encontrado.');
        }
      },
      (error) => {
        console.error('Error al crear la clase:', error);
        alert('Ocurrió un error inesperado al crear la clase. Por favor, revisa la consola para más detalles.');
      }
    );
  }
}
