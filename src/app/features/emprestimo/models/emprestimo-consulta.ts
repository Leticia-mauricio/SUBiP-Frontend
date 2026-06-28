import { EmprestimoListagem } from "./emprestimo-listagem";

export interface EmprestimoConsulta extends EmprestimoListagem {
    tombo: string;
    leitorCpf: string;
    bibliotecaNome: string;
}