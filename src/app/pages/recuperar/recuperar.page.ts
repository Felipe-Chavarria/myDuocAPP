import { Component, OnInit } from '@angular/core';
import { ProveedorCursosService} from '../../providers/proveedor-cursos.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  correo: string = '';

  constructor(private apiService: ProveedorCursosService) { }

  recuperar() {
    if (this.correo.length >= 10) {
      this.apiService.recuperarContrsena(this.correo).subscribe(
        response => {
          console.log('correo de recuperacion enviado:',response.message);
              alert('correo de recuperacion enviado. Revisa tu bandeja de entrada');
        },
        error => {
          console.log('error:',error);
          alert('error al enviar correo de recuperacion');
        });
    }else{
      alert('ingresa un correo valido');
    }
  }
}