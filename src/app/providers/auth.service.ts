import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private TOKEN_KEY = 'auth-token';

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        console.log('token guardado en el local storage: ', token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setPerfil(perfil: string): void {
        localStorage.setItem('perfil', perfil);
        console.log('perfil guardado en el local storage: ', perfil);
    }

    getPerfil(): string | null {
        return localStorage.getItem('perfil');
    }

    setNombre(nombre: string): void {
        localStorage.setItem('nombre', nombre);
        console.log('nombre guardado en el local storage: ', nombre);
    }

    getNombre(): string | null {
        return localStorage.getItem('nombre');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem('perfil');
        localStorage.removeItem('nombre');
    }
}