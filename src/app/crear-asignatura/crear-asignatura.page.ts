import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-asignatura',
  templateUrl: './crear-asignatura.page.html',
  styleUrls: ['./crear-asignatura.page.scss'],
})
export class CrearAsignaturaPage {
  asignaturaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.asignaturaForm = this.fb.group({
      nombre: ['', Validators.required],
      sigla: ['', Validators.required],
      institucion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  async enviarFormulario() {
    const url = 'https://www.presenteprofe.cl/api/v1/cursos';

    try {
      const response = await this.http.post(url, this.asignaturaForm.value).toPromise();
      const toast = await this.toastController.create({
        message: 'Asignatura creada exitosamente.',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
      this.asignaturaForm.reset();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al crear la asignatura.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }
}


