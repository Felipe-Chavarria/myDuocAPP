import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: string = '';
  public perfil: any;
  public currentTheme: 'light' | 'dark' = 'light';

  constructor(private NavCtrl: NavController, private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('usuario');
    this.usuario = storedUser ? storedUser : 'Usuario';

    this.perfil = localStorage.getItem('perfil');

    const storedTheme = localStorage.getItem('theme') || 'light';
    this.currentTheme = storedTheme as 'light' | 'dark';
    document.body.setAttribute('color-theme', this.currentTheme);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('color-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }
}
