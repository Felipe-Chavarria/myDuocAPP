export interface CursosResponse {
    message: string;
    cursos: Curso[];
}

export interface Curso {
    id: number;
    nombre: string;
    descripcion: string;
    titulo: string;  
    subtitulo: string; 
    usuario: Usuario;
}

export interface Usuario {}
