import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';

import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { Login } from '../models/login';
import { Responsive } from '../models/responsive';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  public correo: string = '';
  public password: string = '';
  public usuario: any;

  constructor(private api: ProveedorCursosService, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }


  async login(form: Login) {
    this.api.loginPorCorreo(form).subscribe(
      (response: any) => {
        const datos: Responsive = {
          mensaje: response.message,
          perfil: response.perfil,
          autenticacion: {
            token: response.auth.token,
            type: response.auth.type,
          },
          data: {
            id: response.data.id,
            run: response.data.run,
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            nombre_completo: response.data.nombre_completo,
            correo: response.data.correo,
            perfil: response.data.perfil,
            img: response.data.img,
          },
        };
        console.log(datos.autenticacion.token);
        console.log(datos.mensaje === 'Success');


      if(datos.mensaje === 'Success'){
        this.auth.setToken(datos.autenticacion.token);
        this.auth.setPerfil(datos.data.perfil);
        this.auth.setNombre(datos.data.nombre_completo);

        this.usuario = datos.data.nombre_completo;
        alert('Bienvenido ' +  this.usuario);
        this.router.navigate(['/home']);
      } else{
        alert('Usuario o contraseña incorrecta');
      }
    },
    (error) => {
      console.log(error);
    }
  );
}}