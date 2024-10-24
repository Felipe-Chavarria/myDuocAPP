import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public usuario: string;
  scannedData: any;

  constructor(private http: HttpClient, private NavCtrl: NavController) {
    this.usuario = '';
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      this.usuario = storedUser;
    } else {
      this.usuario = 'Usuario';
    }
  }
}