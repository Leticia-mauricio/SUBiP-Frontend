import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Autenticacao } from '../../models/autenticacao';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  autenticacao: Autenticacao | null = null;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {
    this.autenticacao =
      this.autenticacaoService.getAutenticacao();
  }

  primeiroNome(): string {

    const nome = this.autenticacao?.nome;

    if (!nome) {
      return '';
    }

    return nome.split(' ')[0];

  }

  sair(): void {

    this.autenticacaoService.sair();

    this.autenticacao = null;

    this.router.navigate(['/']);

  }

}