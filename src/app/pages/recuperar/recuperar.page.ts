import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  correo: string = '';

  recuperar() {
    if (this.correo.length >= 10) {
      // Lógica para el envío del correo de recuperación
      console.log(`Se ha enviado un correo de recuperación a: ${this.correo}`);
    } else {
      console.log('Correo inválido');
    }
  }
}
