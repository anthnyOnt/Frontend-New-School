export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_entrega: Date;
    puntaje_maximo: number;
    cursoId: number;
    archivo: string;
}