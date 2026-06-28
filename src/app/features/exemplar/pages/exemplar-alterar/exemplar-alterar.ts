import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Exemplar } from '../../models/exemplar';
import { Livro } from '../../../livro/models/livro';
import { Biblioteca } from '../../../biblioteca/models/biblioteca';
import { SituacaoExemplar } from '../../models/situacao-exemplar';
import { ExemplarService } from '../../services/exemplar.service';
import { LivroService } from '../../../livro/services/livro.service';
import { BibliotecaService } from '../../../biblioteca/services/biblioteca.service';

@Component({
  selector: 'app-exemplar-alterar',
  imports: [FormsModule, CommonModule],
  templateUrl: './exemplar-alterar.html',
  styleUrl: './exemplar-alterar.css',
})
export class ExemplarAlterar implements OnInit {
  exemplar: Exemplar = {
    tombo: '',
    situacao: SituacaoExemplar.DISPONIVEL,
    idLivro: 0,
    idBiblioteca: 0
  };
  livros: Livro[] = [];
  bibliotecas: Biblioteca[] = [];
  situacoes = Object.values(SituacaoExemplar);
  erro: string = '';

  constructor(
    private exemplarService: ExemplarService,
    private livroService: LivroService,
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({
      exemplar: this.exemplarService.buscarPorId(id),
      livros: this.livroService.listar(),
      bibliotecas: this.bibliotecaService.listar()
    }).subscribe({
      next: ({ exemplar, livros, bibliotecas }) => {
        this.exemplar = exemplar;
        this.livros = livros;
        this.bibliotecas = bibliotecas;
      },
      error: (erro) => console.error(erro)
    });
  }

  salvar(): void {
    this.erro = '';
    this.exemplarService.salvar(this.exemplar).subscribe({
      next: () => this.router.navigate(['/gerenciar/exemplares']),
      error: (erro) => this.erro = erro?.error?.message || 'Erro ao alterar exemplar.'
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/exemplares']);
  }
}