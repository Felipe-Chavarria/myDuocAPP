import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { Curso } from '../models/cursos';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  cursos: Curso[] = [];
  errorMessage: string = '';

  constructor(public navCtrl: NavController, public proveedor: ProveedorCursosService) {
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {
    this.proveedor.obtenerDatos().subscribe(
      (data) => {
        this.cursos = data.cursos;
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Error al cargar los cursos';
      }
    );
  }

}
