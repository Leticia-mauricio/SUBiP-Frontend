import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Exemplar } from '../../models/exemplar';
import { Livro } from '../../../livro/models/livro';
import { Biblioteca } from '../../../biblioteca/models/biblioteca';
import { SituacaoExemplar } from '../../models/situacao-exemplar';
import { ExemplarService } from '../../services/exemplar.service';
import { LivroService } from '../../../livro/services/livro.service';
import { BibliotecaService } from '../../../biblioteca/services/biblioteca.service';

@Component({
  selector: 'app-exemplar-listar',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './exemplar-listar.html',
  styleUrl: './exemplar-listar.css',
})
export class ExemplarListar implements OnInit {
  lista: {
    id: number;
    tombo: string;
    situacao: SituacaoExemplar;
    tituloLivro: string;
    nomeBiblioteca: string;
    idLivro: number;
    idBiblioteca: number;
  }[] = [];
  listaFiltrada = [...this.lista];
  livros: Livro[] = [];
  bibliotecas: Biblioteca[] = [];
  situacoes = Object.values(SituacaoExemplar);

  filtro = {
    tombo: '',
    livroId: null as number | null,
    bibliotecaId: null as number | null,
    situacao: ''
  };

  constructor(
    private exemplarService: ExemplarService,
    private livroService: LivroService,
    private bibliotecaService: BibliotecaService
  ) { }

  ngOnInit(): void {
    forkJoin({
      exemplares: this.exemplarService.listar(),
      livros: this.livroService.listar(),
      bibliotecas: this.bibliotecaService.listar()
    }).subscribe(({ exemplares, livros, bibliotecas }) => {
      this.livros = livros;
      this.bibliotecas = bibliotecas;

      this.lista = exemplares.map(e => {
        const livro = livros.find(l => l.id === e.livroId);
        const biblioteca = bibliotecas.find(b => b.id === e.bibliotecaId);
        return {
          id: e.id!,
          tombo: e.tombo,
          situacao: e.situacao,
          tituloLivro: livro?.titulo ?? 'Livro não encontrado',
          nomeBiblioteca: biblioteca?.nome ?? 'Biblioteca não encontrada',
          idLivro: e.livroId,
          idBiblioteca: e.bibliotecaId
        };
      });

      this.listaFiltrada = [...this.lista];
    });
  }

  pesquisar(): void {
    this.listaFiltrada = this.lista.filter(e => {
      if (this.filtro.tombo &&
        !e.tombo.toLowerCase().includes(this.filtro.tombo.toLowerCase())) return false;
      if (this.filtro.livroId && e.idLivro !== this.filtro.livroId) return false;
      if (this.filtro.bibliotecaId && e.idBiblioteca !== this.filtro.bibliotecaId) return false;
      if (this.filtro.situacao && e.situacao !== this.filtro.situacao) return false;
      return true;
    });
  }

  limpar(): void {
    this.filtro = { tombo: '', livroId: null, bibliotecaId: null, situacao: '' };
    this.listaFiltrada = [...this.lista];
  }
}