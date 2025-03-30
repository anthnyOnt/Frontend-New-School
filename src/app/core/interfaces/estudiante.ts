import { usuario } from "./usuario";

export interface Estudiante extends usuario{
    id: number;
    fecha_nacimiento ?: string;
}
