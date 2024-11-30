import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private CURSO_ID_KEY = 'curso-id';

  // Método para guardar el curso.id
  async setCursoId(id: number): Promise<void> {
    await Preferences.set({ key: this.CURSO_ID_KEY, value: id.toString() });
    console.log('ID del curso guardado:', id);
  }

  // Método para obtener el curso.id
  async getCursoId(): Promise<number | null> {
    try {
        const result = await Preferences.get({ key: this.CURSO_ID_KEY });
        return result.value !== undefined && result.value !== null ? Number(result.value) : null;
    } catch (error) {
        console.error('Error al obtener el ID del curso desde Preferences:', error);
        return null; 
    }
  }



  // Método para eliminar el curso.id
  async clearCursoId(): Promise<void> {
    await Preferences.remove({ key: this.CURSO_ID_KEY });
    console.log('ID del curso eliminado');
  }
}