import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  public correo: string;
  public password: any;
  public usuario: string;

  constructor(private NavCtrl: NavController) {
    this.correo = '';
    this.password = '';
    this.usuario ='';
  }

  ngOnInit() {
    const storedUser =  localStorage.getItem('usuario');
    if(storedUser){
      this.usuario = storedUser;
    }
  }

  login() {
    if (this.correo === 'admin@gmail.com' && this.password === '12345') {
      // Si es administrador
      alert('El admin ha Ingresado');
      localStorage.setItem('usuario', this.usuario);  // Guardar en localStorage
      this.NavCtrl.navigateForward('/home');
    } else if (this.correo === 'alumno@gmail.com' && this.password === '12345') {
      // Si es alumno
      alert('El alumno ha Ingresado');
      localStorage.setItem('usuario', this.usuario);  // Guardar en localStorage
      this.NavCtrl.navigateForward('/home');
    } else {
      // Usuario no registrado
      alert('Error: no está registrado');
    }
  }
}
