import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Livro } from '../../models/livro';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-listar',
  imports: [CommonModule, RouterLink],
  templateUrl: './livro-listar.html',
  styleUrl: './livro-listar.css',
})
export class LivroListar implements OnInit {

  livros: Livro[] = [];

  constructor(
    private LivroService: LivroService
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.LivroService
      .listar()
      .subscribe({
        next: (livros) => {
          this.livros = livros;
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }

}