import { SituacaoExemplar } from "../../exemplar/models/situacao-exemplar";


export interface Acervo {
    livroId: number;
    titulo: string;
    isbn: string;

    generoId: number;
    generoDescricao: string;

    exemplarId: number;
    tombo: string;

    situacao: SituacaoExemplar;

    bibliotecaId: number;
    bibliotecaNome: string;
}