import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Exemplar } from '../../models/exemplar';
import { Livro } from '../../../livro/models/livro';
import { Biblioteca } from '../../../biblioteca/models/biblioteca';
import { SituacaoExemplar } from '../../models/situacao-exemplar';
import { ExemplarService } from '../../services/exemplar.service';
import { LivroService } from '../../../livro/services/livro.service';
import { BibliotecaService } from '../../../biblioteca/services/biblioteca.service';

@Component({
  selector: 'app-exemplar-adicionar',
  imports: [FormsModule, CommonModule],
  templateUrl: './exemplar-adicionar.html',
  styleUrl: './exemplar-adicionar.css',
})
export class ExemplarAdicionar implements OnInit {
  exemplar: Exemplar = {
    tombo: '',
    situacao: SituacaoExemplar.DISPONIVEL,
    idLivro: 0,
    idBiblioteca: 0
  };
  livros: Livro[] = [];
  bibliotecas: Biblioteca[] = [];
  erro: string = '';

  constructor(
    private exemplarService: ExemplarService,
    private livroService: LivroService,
    private bibliotecaService: BibliotecaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    forkJoin({
      livros: this.livroService.listar(),
      bibliotecas: this.bibliotecaService.listar()
    }).subscribe(({ livros, bibliotecas }) => {
      this.livros = livros;
      this.bibliotecas = bibliotecas;
    });
  }

  salvar(): void {
    this.erro = '';
    this.exemplarService.salvar(this.exemplar).subscribe({
      next: () => this.router.navigate(['/gerenciar/exemplares']),
      error: (erro) => this.erro = erro?.error?.message || 'Erro ao salvar exemplar.'
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/exemplares']);
  }
}