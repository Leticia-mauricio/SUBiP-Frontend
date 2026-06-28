import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Livro } from '../../models/livro';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-excluir',
  imports: [CommonModule],
  templateUrl: './livro-excluir.html',
  styleUrl: './livro-excluir.css',
})
export class LivroExcluir implements OnInit {
  livro: Livro = { titulo: '', isbn: '', generoId: 0, generoDescricao: '' };
  erro: string = '';

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.livroService.buscarPorId(id).subscribe({
      next: (livro) => this.livro = livro,
      error: (erro) => console.error(erro)
    });
  }

  excluir(): void {
    this.erro = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.livroService.excluir(id).subscribe({
      next: () => this.router.navigate(['/gerenciar/livros']),
      error: (erro) => this.erro = erro?.error?.message || 'Erro ao excluir livro. Não é possível excluir um livro vinculado a um exemplar.'
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/livros']);
  }
}