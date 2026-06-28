import { Perfil } from "../../../models/perfil";

export interface Usuario {
  id?: number;
  login: string;
  perfil: Perfil;
  pessoaId: number;
  pessoaNome?: string;
}