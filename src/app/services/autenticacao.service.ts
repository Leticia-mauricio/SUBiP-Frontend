import { Injectable } from '@angular/core';

import { Autenticacao } from '../models/autenticacao';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  /*getAutenticacao(): Autenticacao | null {

    const autenticacao = localStorage.getItem('autenticacao');

    if (autenticacao) {
      return JSON.parse(autenticacao);
    }

    return null;

  }*/

  getAutenticacao(): Autenticacao | null {

    // TESTE TEMPORÁRIO
    return {
      id: 1,
      nome: 'Letícia Maurício',
      email: 'leticia@email.com',
      perfil: Perfil.LEITOR
    };

  }

  sair(): void {
    localStorage.removeItem('autenticacao');
  }

}