import { Curso } from "./curso"
import { Profesor } from "./profesor"
import { Grado } from "./grado"

export interface CursoCompleto extends Curso {
    profesor?: Profesor,
    grado?: Grado
}