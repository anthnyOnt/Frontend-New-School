import { usuario } from "./usuario";

export interface Padre {
    parentesco: Padre;
    estudianteId: number;
    usuario: usuario
}