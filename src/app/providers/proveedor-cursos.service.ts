import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/cursos';

@Injectable({
  providedIn: 'root',
})
export class ProveedorCursosService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1/cursos?user=profesor@presenteprofe.cl';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl); 
  }
}