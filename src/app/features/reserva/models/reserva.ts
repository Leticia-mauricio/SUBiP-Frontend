import { SituacaoReserva } from "./situacao-reserva";

export interface Reserva {
    id?: number;

    situacao: SituacaoReserva;

    dataRegistro: string;

    exemplarId: number;
    pessoaId: number;
}