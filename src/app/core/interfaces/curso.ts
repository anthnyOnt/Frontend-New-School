export interface Curso {
    id: number;
    nombre: string;
    descripcion: string;
    fechaCreacion: Date;

    profesorId?: number;
    gradoId: number;
}