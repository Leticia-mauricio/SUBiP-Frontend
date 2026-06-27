import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Livro } from '../../models/livro'
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-adicionar',
  imports: [FormsModule],
  templateUrl: './livro-adicionar.html',
  styleUrl: './livro-adicionar.css',
})
export class LivroAdicionar {
  
  livro: Livro = {
    titulo: '',
    isbn: '',
    generoId: 0,
    generoDescricao: ''
  };

  erro: string = '';

  constructor(
    private livroService: LivroService,
    private router: Router
  ) { }

  salvar(): void {
    this.erro = '';
    this.livroService
      .salvar(this.livro)
      .subscribe({
        next: () => {
          this.router.navigate(['/gerenciar/livros']);
        },
        error: (erro) => {
          this.erro = erro?.error?.message || 'Erro ao salvar livro.';
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/livros']);
  }
}
