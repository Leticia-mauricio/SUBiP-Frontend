import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Dashboard } from '../../components/dashboard/dashboard';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    Dashboard
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(
    private autenticacaoService: AutenticacaoService
  ) {}

  dashboardVisivel(): boolean {
    return this.autenticacaoService.getAutenticacao() !== null;
  }

}