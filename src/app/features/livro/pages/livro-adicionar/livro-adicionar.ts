import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Livro } from '../../models/livro';
import { Genero } from '../../../genero/models/genero';
import { LivroService } from '../../services/livro.service';
import { GeneroService } from '../../../genero/services/genero.service';

@Component({
  selector: 'app-livro-adicionar',
  imports: [FormsModule, CommonModule],
  templateUrl: './livro-adicionar.html',
  styleUrl: './livro-adicionar.css',
})
export class LivroAdicionar implements OnInit {
  livro: Livro = { titulo: '', isbn: '', generoId: 0, generoDescricao: '' };
  generos: Genero[] = [];
  erro: string = '';

  constructor(
    private livroService: LivroService,
    private generoService: GeneroService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.generoService.listar().subscribe(g => this.generos = g);
  }

  salvar(): void {
    this.erro = '';
    this.livroService.salvar(this.livro).subscribe({
      next: () => this.router.navigate(['/gerenciar/livros']),
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao salvar livro.';
        this.cdr.detectChanges();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/livros']);
  }
}