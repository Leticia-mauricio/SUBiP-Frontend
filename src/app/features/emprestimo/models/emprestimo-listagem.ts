import { Emprestimo } from "./emprestimo";

export interface EmprestimoListagem extends Emprestimo {
    titulo: string;
    pessoaNome: string;
}