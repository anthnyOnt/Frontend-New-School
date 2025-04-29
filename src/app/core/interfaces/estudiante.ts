import { usuario } from "./usuario";

export interface Estudiante{
    id: number;
    fecha_nacimiento ?: string;
    usuario: usuario
}
