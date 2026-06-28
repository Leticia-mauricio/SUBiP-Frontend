import { SituacaoReserva } from './situacao-reserva';

export interface ReservaView {
  id: number;
  situacao: SituacaoReserva;
  dataRegistro: string;
  tituloLivro: string;
  tombo: string;
  biblioteca: string;
  livroId: number;
  exemplarId: number;
  bibliotecaId: number;
  pessoaId: number;
  pessoaNome: string;
}