import { Component } from '@angular/core';
import { Livro } from '../../models/livro'
import { FormsModule } from '@angular/forms';
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

  constructor(
    private livroService: LivroService
  ) { }

  salvar(): void {
    this.livroService
      .salvar(this.livro)
      .subscribe({
        next: (resposta) => {
          console.log('Livro salvo', resposta);
        },
        error: (erro) => {
          console.error('Erro', erro);
        }
      });
  }
}
