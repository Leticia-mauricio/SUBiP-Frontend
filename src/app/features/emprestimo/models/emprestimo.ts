import { SituacaoEmprestimo } from "./situacao-emprestimo";

export interface Emprestimo {
    id?: number;

    situacao: SituacaoEmprestimo;

    dataRetirada: string;
    dataDevolucaoPrevista: string;
    dataDevolucao?: string;

    exemplarId: number;
    pessoaId: number;

    diasAtraso?: number;
}