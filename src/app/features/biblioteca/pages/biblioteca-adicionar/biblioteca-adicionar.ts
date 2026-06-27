import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Biblioteca } from '../../models/biblioteca'
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-adicionar',
  imports: [FormsModule],
  templateUrl: './biblioteca-adicionar.html',
  styleUrl: './biblioteca-adicionar.css',
})
export class BibliotecaAdicionar {
  biblioteca: Biblioteca = { nome: '' };
  erro: string = '';

  constructor(
    private bibliotecaService: BibliotecaService,
    private router: Router
  ) { }

  salvar(): void {
    this.erro = '';
    this.bibliotecaService.salvar(this.biblioteca).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/bibliotecas']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao salvar biblioteca.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/bibliotecas']);
  }
}
