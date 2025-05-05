import { usuario } from "./usuario";

export interface Profesor {
    id: number;
    licenciatura: string;
    titulo: string;
    usuario: usuario
}