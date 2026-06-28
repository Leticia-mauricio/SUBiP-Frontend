import { SituacaoExemplar } from "./situacao-exemplar"

export interface Exemplar {
    id?: number;
    tombo: string;
    situacao: SituacaoExemplar;
    livroId: number;       // era idLivro
    bibliotecaId: number;  // era idBiblioteca
}
