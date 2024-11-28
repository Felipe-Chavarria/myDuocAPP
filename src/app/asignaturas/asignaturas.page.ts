import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { Curso } from '../models/cursos'
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  cursos: Curso[] = [];
  errorMessage: string = '';

  constructor(private proveedor: ProveedorCursosService, private auth: AuthService) {
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {
      this.obtenerCursos();
  }

  obtenerCursos() {
    this.proveedor.obtenerCursosEstudiante().subscribe(
      (response: any) => {
        if (response.message === 'Success') {
          this.cursos = response.cursos;
        }
        else {
          this.errorMessage = 'No se han encontrado cursos';
        }
      },
      (error: any) => {
        this.errorMessage = 'No se han encontrado cursos';
      }
    );
  }
}