import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Livro } from '../../models/livro';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-excluir',
  imports: [],
  templateUrl: './livro-excluir.html',
  styleUrl: './livro-excluir.css',
})
export class LivroExcluir implements OnInit {

  livro: Livro = {
    titulo: '',
    isbn: '',
    generoId: 0,
    generoDescricao: ''
  };

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.livroService
      .buscarPorId(id)
      .subscribe({
        next: (livro) => {
          this.livro = livro;
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }

  excluir(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) return;

    this.livroService
      .excluir(id)
      .subscribe({
        next: () => {
          console.log('Livro excluído');
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }
}