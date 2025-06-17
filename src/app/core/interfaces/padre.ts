import { usuario } from "./usuario";

export interface Padre {
    id: number;
    parentesco: Padre;
    estudianteId: number;
    usuario: usuario
}