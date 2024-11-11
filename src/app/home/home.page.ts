import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  
  public usuario: string ;
  public perfil: any;

  constructor(private NavCtrl: NavController, private router: Router) {
    this.usuario = '';
    this.perfil = '';
  }

  ngOnInit() {
    const storedUser =  localStorage.getItem('usuario');
    if(storedUser){
      this.usuario = storedUser;
    }else{
      this.usuario = 'Usuario';
    }
    const storedPerfil = localStorage.getItem('perfil');
    this.perfil = storedPerfil;

  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');
    localStorage.removeItem('usuario');
    const user = localStorage.getItem('usuario');
    console.log(user);
    this.router.navigate(['/login']);
  }
}
