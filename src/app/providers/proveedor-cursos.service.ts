import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProveedorCursosService {

  constructor(public http: HttpClient) { 
    console.log('Hello ProveedorCursosService Service');
  }

  obtenerDatos(){
    return this.http.get('https://www.presenteprofe.cl/api/v1/cursos?user=profesor@presenteprofe.cl')
  }

}