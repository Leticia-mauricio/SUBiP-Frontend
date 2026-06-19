import { SituacaoExemplar } from "./situacao-exemplar"

export interface Exemplar {
    id?: number,
    tombo: string,
    situacao: SituacaoExemplar,
    idLivro: Number,
    idBiblioteca: number
}
