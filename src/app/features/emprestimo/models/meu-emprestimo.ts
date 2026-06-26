import { SituacaoEmprestimo } from "./situacao-emprestimo";

export interface MeuEmprestimo {

    id: number;

    tituloLivro: string;

    tombo: string;

    biblioteca: string;

    situacao: SituacaoEmprestimo;

    dataRetirada: string;

    dataDevolucaoPrevista: string;

    dataDevolucao?: string;

    diasAtraso?: number;

}