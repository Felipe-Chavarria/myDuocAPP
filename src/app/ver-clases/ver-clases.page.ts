import { Component, OnInit } from '@angular/core';
import { CursoService } from '../providers/curso.service';
import { HttpClient } from '@angular/common/http'; // Importación de HttpClient

@Component({
  selector: 'app-ver-clases',
  templateUrl: './ver-clases.page.html',
  styleUrls: ['./ver-clases.page.scss'],
})
export class VerClasesPage implements OnInit {
  public clases: any[] = []; // Lista para almacenar las clases del curso
  public cursoNombre: string = ''; // Nombre del curso
  private idCurso: number | null = null; // ID del curso

  constructor(
    private cursoService: CursoService,
    private http: HttpClient // Inyección de HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener el ID del curso desde el almacenamiento local
    this.idCurso = await this.cursoService.getCursoId(); 
    if (!this.idCurso) {
      alert('No se ha seleccionado un curso.');
    } else {
      console.log('ID del curso cargado:', this.idCurso);

      // Llamar al método para obtener las clases del curso
      this.obtenerClasesDelCurso();
    }
  }

  obtenerClasesDelCurso(): void {
    if (!this.idCurso) {
      console.error('ID del curso no especificado.');
      return;
    }

    // Construcción de la URL para obtener las clases del curso
    const url = `https://www.presenteprofe.cl/api/v1/cursos/${this.idCurso}/clase`;

    // Realizar la solicitud GET a la API
    this.http.get<any>(url).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response);
        if (response && response.message === 'Listado de clases del curso') {
          this.cursoNombre = response.curso.nombre; // Almacenar el nombre del curso
          this.clases = response.clases; // Almacenar las clases en la variable 'clases'
        } else {
          alert('No se pudo obtener la lista de clases.');
        }
      },
      (error) => {
        console.error('Error al obtener las clases:', error);
        alert('Ocurrió un error al obtener las clases. Por favor, revisa la consola para más detalles.');
      }
    );
  }
}
