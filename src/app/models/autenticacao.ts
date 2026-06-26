import { Perfil } from './perfil';

export interface Autenticacao {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
  
}

