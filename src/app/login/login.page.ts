import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { Login } from '../models/login';
import { Responsive } from '../models/responsive';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  public correo: string;
  public password: any;
  public usuario: string;
  private token: string;

  constructor(private NavCtrl: NavController, private api: ProveedorCursosService, private router: Router) {
    this.correo = '';
    this.password = '';
    this.usuario ='';
    this.token = '';
  }


  login(form: Login) {
    this.api.loginPorCorreo(form).subscribe(response => {
        const datos: Responsive = {
          mensaje: response.message,
          perfil: response.perfil,
          autenticacion: {
            token: response.auth.token,
            type: response.auth.type
          },
          data: {
            id: response.data.id,
            run: response.data.run,
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            nombre_completo: response.data.nombre_completo,
            correo: response.data.correo,
            perfil: response.data.perfil,
            img: response.data.img
          }
    }; 
      if(datos.mensaje === 'Success'){
        localStorage.setItem('token', datos.autenticacion.token);
        localStorage.setItem('perfil', datos.perfil);
        localStorage.setItem('usuario', datos.data.nombre_completo);
        const user = localStorage.getItem('usuario');
        console.log(datos);
        console.log(user)
        this.router.navigate(['/home']);
      }
      },error => {
        console.log('Error al iniciar:', error);
      },
    );
  }
}
