export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_entrega: Date;
    puntaje_max: number;
    curso_id: number;
}