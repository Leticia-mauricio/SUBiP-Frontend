import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Livro } from '../../models/livro';
import { Genero } from '../../../genero/models/genero';
import { LivroService } from '../../services/livro.service';
import { GeneroService } from '../../../genero/services/genero.service';

@Component({
  selector: 'app-livro-alterar',
  imports: [FormsModule, CommonModule],
  templateUrl: './livro-alterar.html',
  styleUrl: './livro-alterar.css',
})
export class LivroAlterar implements OnInit {
  livro: Livro = { titulo: '', isbn: '', generoId: 0, generoDescricao: '' };
  generos: Genero[] = [];
  erro: string = '';

  constructor(
    private livroService: LivroService,
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({
      livro: this.livroService.buscarPorId(id),
      generos: this.generoService.listar()
    }).subscribe({
      next: ({ livro, generos }) => {
        this.livro = livro;
        this.generos = generos;
      },
      error: (erro) => console.error(erro)
    });
  }

  salvar(): void {
    this.erro = '';
    this.livroService.salvar(this.livro).subscribe({
      next: () => this.router.navigate(['/gerenciar/livros']),
      error: (erro) => this.erro = erro?.error?.message || 'Erro ao alterar livro.'
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/livros']);
  }
}