import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/cursos';
import { Login} from '../models/login';
import { Responsive } from '../models/responsive';

@Injectable({
  providedIn: 'root',
})
export class ProveedorCursosService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1/cursos?user=profesor@presenteprofe.cl';
  private url = 'https://www.presenteprofe.cl/api/v1/';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl); 
  }

  loginPorCorreo(form:Login){
    let url = this.url + 'auth';
    return this.http.post<any>(url, form);
  }

  recuperarContrsena(correo: string): Observable<any> {
    return this.http.post('${this.url}/recuperar', {correo});
  }
}
