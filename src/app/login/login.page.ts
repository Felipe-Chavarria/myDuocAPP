import { Component, OnInit } from '@angular/core';
import{ NavControler } from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public correo: string;
  public password: any;

  constructor(private NavCtrl: NavControler) {
    this.correo = '',
    this.password = '';
   }
   login(){
    if (this,this.correo == 'admin@gmail.com' && this.password == '12345'){
      //alert('es admin')
      this.NavCtrl.navigateForward('/home')
    } 
    if (this,this.correo == 'admin@gmail.com' && this.password == '12345'){
      alert('es alumno')
      this.NavCtrl.navigateForward('/home')
    }else{
      //alert('error no esta registrado');
    }

   }

}
