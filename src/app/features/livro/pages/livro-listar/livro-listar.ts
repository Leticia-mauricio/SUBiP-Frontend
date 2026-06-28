import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Livro } from '../../models/livro';
import { Genero } from '../../../genero/models/genero';
import { LivroService } from '../../services/livro.service';
import { GeneroService } from '../../../genero/services/genero.service';

@Component({
  selector: 'app-livro-listar',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './livro-listar.html',
  styleUrl: './livro-listar.css',
})
export class LivroListar implements OnInit {
  lista: Livro[] = [];
  listaFiltrada: Livro[] = [];
  generos: Genero[] = [];

  filtro = { titulo: '', isbn: '', generoId: null as number | null };

  constructor(
    private livroService: LivroService,
    private generoService: GeneroService
  ) {}

  ngOnInit(): void {
    forkJoin({
      livros: this.livroService.listar(),
      generos: this.generoService.listar()
    }).subscribe(({ livros, generos }) => {
      this.lista = livros;
      this.listaFiltrada = [...livros];
      this.generos = generos;
    });
  }

  pesquisar(): void {
    this.listaFiltrada = this.lista.filter(l => {
      if (this.filtro.titulo &&
        !l.titulo.toLowerCase().includes(this.filtro.titulo.toLowerCase())) return false;
      if (this.filtro.isbn &&
        !l.isbn.toLowerCase().includes(this.filtro.isbn.toLowerCase())) return false;
      if (this.filtro.generoId && l.generoId !== this.filtro.generoId) return false;
      return true;
    });
  }

  limpar(): void {
    this.filtro = { titulo: '', isbn: '', generoId: null };
    this.listaFiltrada = [...this.lista];
  }
}