import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public correo: string;
  public password: string;
  public usuario: string;

  private apiUrl = 'https://www.presenteprofe.cl/api/v1/auth';

  constructor(private NavCtrl: NavController, private http: HttpClient) {
    this.correo = '';
    this.password = '';
    this.usuario = '';
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      this.usuario = storedUser;
    }
  }

  login() {
    const credentials = {
      correo: this.correo,
      password: this.password,
    };

    this.http.post(this.apiUrl, credentials).subscribe(
      (response: any) => {
        console.log(response); // Imprime la respuesta para verificar la estructura

        if (response && response.message === 'Success') {
          alert('Login exitoso');

          // Guardar solo el nombre y apellido en localStorage
          this.usuario = `${response.data.nombre} ${response.data.apellido}`;
          localStorage.setItem('usuario', this.usuario); // Guardar solo el nombre y apellido en localStorage
          
          this.NavCtrl.navigateForward('/home'); // Navegar a la página de inicio
        } else {
          alert('Error: ' + response.message); // Mostrar mensaje de error de la respuesta
        }
      },
      (error) => {
        console.error('Error de conexión:', error); // Imprime el error en la consola para más detalles
        alert('Error de conexión: ' + error.message);
      }
    );
  }
}
