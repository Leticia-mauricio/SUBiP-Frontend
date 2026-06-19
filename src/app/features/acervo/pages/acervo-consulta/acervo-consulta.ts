import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Acervo } from '../../models/acervo';
import { AcervoAgrupado } from '../../models/acervo-agrupado';

import { AcervoService } from '../../services/acervo.service';

import { Genero } from '../../../genero/models/genero';
import { GeneroService } from '../../../genero/services/genero.service';

import { Biblioteca } from '../../../biblioteca/models/biblioteca';
import { BibliotecaService } from '../../../biblioteca/services/biblioteca.service';

@Component({
  selector: 'app-acervo-consulta',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './acervo-consulta.html',
  styleUrl: './acervo-consulta.css',
})
export class AcervoConsulta implements OnInit {

  titulo = '';

  generoId: number | null = null;

  bibliotecaId: number | null = null;

  somenteDisponiveis = true;

  pesquisou = false;

  generos: Genero[] = [];

  bibliotecas: Biblioteca[] = [];

  resultados: AcervoAgrupado[] = [];

  constructor(
    private acervoService: AcervoService,
    private generoService: GeneroService,
    private bibliotecaService: BibliotecaService
  ) {}

  ngOnInit(): void {

    this.carregarGeneros();

    this.carregarBibliotecas();
  }

  carregarGeneros(): void {

    this.generoService.listar().subscribe({
      next: (dados) => {
        this.generos = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar gêneros', erro);
      }
    });

  }

  carregarBibliotecas(): void {

    this.bibliotecaService.listar().subscribe({
      next: (dados) => {
        this.bibliotecas = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar bibliotecas', erro);
      }
    });

  }

  pesquisar(): void {

    this.acervoService.pesquisar(
      this.titulo,
      this.generoId,
      this.bibliotecaId,
      this.somenteDisponiveis
    ).subscribe({

      next: (dados) => {

        this.resultados = this.agruparAcervo(dados);

        this.pesquisou = true;
      },

      error: (erro) => {

        console.error('Erro ao pesquisar acervo', erro);

        this.resultados = [];

        this.pesquisou = true;
      }

    });

  }

  private agruparAcervo(
    registros: Acervo[]
  ): AcervoAgrupado[] {

    const mapa = new Map<string, AcervoAgrupado>();

    registros.forEach(item => {

      if (item.situacao === 'INDISPONIVEL') {
        return;
      }

      const chave =
        `${item.livroId}-${item.bibliotecaId}`;

      if (!mapa.has(chave)) {

        mapa.set(chave, {

          livroId: item.livroId,

          titulo: item.titulo,

          isbn: item.isbn,

          generoId: item.generoId,

          generoDescricao: item.generoDescricao,

          bibliotecaId: item.bibliotecaId,

          bibliotecaNome: item.bibliotecaNome,

          quantidadeDisponivel: 0,

          quantidadeEmprestada: 0
        });

      }

      const grupo = mapa.get(chave)!;

      if (item.situacao === 'DISPONIVEL') {
        grupo.quantidadeDisponivel++;
      }

      if (item.situacao === 'EMPRESTADO') {
        grupo.quantidadeEmprestada++;
      }

    });

    return Array.from(mapa.values());

  }

}