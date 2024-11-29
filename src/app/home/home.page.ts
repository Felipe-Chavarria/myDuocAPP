import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  
  public usuario: any ;
  public perfil: any;
  public currentTheme: 'light' | 'dark' = 'light';

  constructor(private auth: AuthService, private router: Router) {
    this.usuario = '';
    this.perfil = '';
  }

  async ngOnInit() {
      this.usuario = await this.auth.getNombre();
      this.perfil = await this.auth.getPerfil();
}

  async cerrarSesion(){
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
  //dark mode
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('color-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }
}
