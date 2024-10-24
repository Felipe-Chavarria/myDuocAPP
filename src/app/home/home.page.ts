import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: string;

  constructor(private NavCtrl: NavController) {
    this.usuario = '';
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      this.usuario = storedUser; // Recuperar usuario almacenado
    } else {
      this.usuario = 'Usuario'; // Valor predeterminado si no hay usuario
    }
  }
}
