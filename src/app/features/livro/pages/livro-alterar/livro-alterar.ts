import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Livro } from '../../models/livro';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-alterar',
  imports: [FormsModule],
  templateUrl: './livro-alterar.html',
  styleUrl: './livro-alterar.css',
})
export class LivroAlterar implements OnInit {

  livro: Livro = {
    titulo: '',
    isbn: '',
    generoId: 0,
    generoDescricao: ''
  };

  erro: string = '';

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.livroService.buscarPorId(id).subscribe({
      next: (livro) => { this.livro = livro; },
      error: (erro) => { console.error(erro); }
    });
  }

  salvar(): void {
    this.erro = '';
    this.livroService.salvar(this.livro).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/livros']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao alterar livro.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/livros']);
  }
}
