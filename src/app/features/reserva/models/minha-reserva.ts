import { SituacaoReserva } from './situacao-reserva';

export interface MinhaReserva {

    id: number;

    tituloLivro: string;

    nomeBiblioteca: string;

    dataReserva: string;

    dataDisponibilizacao?: string;

    situacao: SituacaoReserva;

}