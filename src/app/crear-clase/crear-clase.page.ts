import { Component, OnInit } from '@angular/core';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { CrearClase } from '../models/clase';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../providers/curso.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { AlertController } from '@ionic/angular';

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
  public codeClass: string = '';

  constructor(
    private alertController: AlertController,  // Inyección del AlertController
    private api: ProveedorCursosService,
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private http: HttpClient 
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener el ID del curso desde el almacenamiento local
    this.idCurso = await this.cursoService.getCursoId(); 
    if (!this.idCurso) {
      this.presentAlert('Error', 'No se ha seleccionado un curso.');
    } else {
      console.log('ID del curso cargado:', this.idCurso);
    }

    // Inicializar minFecha con la fecha de hoy en formato "YYYY-MM-DD"
    const today = new Date();
    this.minFecha = today.toISOString().split('T')[0];
  }

  // Función para mostrar las alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  enviarFormulario(): void {
    if (!this.idCurso) {
      this.presentAlert('Error', 'ID del curso no especificado');
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
          this.presentAlert('Éxito', 'Clase creada con éxito.');
          this.cursoService.setCursoCode(response.codigo_qr.toString()).then(() => {
            this.codeClass = response.codigo_qr;
            console.log('Codigo de la clase guardado:', this.codeClass);
          });
        } else if (response.message === 'No autenticado') {
          this.presentAlert('Error', 'Debe iniciar sesión para realizar esta acción.');
        } else if (response.message === 'Curso no encontrado') {
          this.presentAlert('Error', 'El curso no fue encontrado.');
        }
      },
      (error) => {
        console.error('Error al crear la clase:', error);
        this.presentAlert('Error', 'Ocurrió un error inesperado al crear la clase. Por favor, revisa la consola para más detalles.');
      }
    );
  }
}
