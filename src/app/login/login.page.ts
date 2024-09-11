import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public correo: string;
  public password: any;

  constructor(private NavCtrl: NavController) {
    this.correo = '';
    this.password = '';
  }

  login() {
    if (this.correo === 'admin@gmail.com' && this.password === '12345') {
      alert('El admin ha Ingresado');
      this.NavCtrl.navigateForward('/home');
    } else if (this.correo === 'alumno@gmail.com' && this.password === '12345') {
      // Si es alumno
      alert('El alumno ha Ingresado');
      this.NavCtrl.navigateForward('/home');
    } else {
      // Usuario no registrado
      alert('Error no está registrado');
    }
  }
}
