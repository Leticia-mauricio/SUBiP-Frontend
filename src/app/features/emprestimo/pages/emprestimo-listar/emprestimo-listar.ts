import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Biblioteca } from '../../../biblioteca/models/biblioteca';

import { EmprestimoService } from '../../services/emprestimo.service';
import { ExemplarService } from '../../../exemplar/services/exemplar.service';
import { LivroService } from '../../../livro/services/livro.service';
import { PessoaService } from '../../../pessoa/services/pessoa.service';
import { BibliotecaService } from '../../../biblioteca/services/biblioteca.service';

import { SituacaoEmprestimo } from '../../models/situacao-emprestimo';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-emprestimo-listar',
  templateUrl: './emprestimo-listar.html',
  styleUrls: ['./emprestimo-listar.css']
})
export class EmprestimoListar implements OnInit {

  lista: {
    id: number;
    titulo: string;
    tombo: string;
    pessoaNome: string;
    bibliotecaNome: string;       
    bibliotecaId: number | null;
    situacao: SituacaoEmprestimo;
    dataRetirada: string;
    dataDevolucaoPrevista: string;
  }[] = [];

  listaFiltrada = [...this.lista];
  bibliotecas: Biblioteca[] = [];
  situacoes = Object.values(SituacaoEmprestimo);

  filtro = { tombo: '', titulo: '', pessoa: '', situacao: '', bibliotecaId: null as number | null };

  constructor(
    private emprestimoService: EmprestimoService,
    private exemplarService: ExemplarService,
    private livroService: LivroService,
    private pessoaService: PessoaService,
    private bibliotecaService: BibliotecaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    forkJoin({
      emprestimos: this.emprestimoService.listar(),
      exemplares: this.exemplarService.listar(),
      livros: this.livroService.listar(),
      pessoas: this.pessoaService.listar(),
      bibliotecas: this.bibliotecaService.listar()
    }).subscribe(({ emprestimos, exemplares, livros, pessoas, bibliotecas }) => {

      this.bibliotecas = bibliotecas; // guarda para o select

      this.lista = emprestimos.map(emp => {
        const exemplar = exemplares.find(e => e.id === emp.exemplarId);
        const livro = livros.find(l => l.id === exemplar?.idLivro);
        const pessoa = pessoas.find(p => p.id === emp.pessoaId);
        const biblioteca = bibliotecas.find(b => b.id === exemplar?.idBiblioteca);

        return {
          id: emp.id!,
          titulo: livro?.titulo ?? 'Livro não encontrado',
          tombo: exemplar?.tombo ?? 'Sem tombo',
          pessoaNome: pessoa?.nome ?? 'Pessoa não encontrada',
          bibliotecaNome: biblioteca?.nome ?? 'Sem biblioteca',
          bibliotecaId: exemplar?.idBiblioteca ?? null,
          situacao: emp.situacao,
          dataRetirada: emp.dataRetirada,
          dataDevolucaoPrevista: emp.dataDevolucaoPrevista
        };
      });

      this.listaFiltrada = [...this.lista];
    });
  }

  pesquisar(): void {
    this.listaFiltrada = this.lista.filter(e => {
      if (this.filtro.tombo &&
        !e.tombo.toLowerCase().includes(this.filtro.tombo.toLowerCase())) return false;
      if (this.filtro.titulo &&
        !e.titulo.toLowerCase().includes(this.filtro.titulo.toLowerCase())) return false;
      if (this.filtro.pessoa &&
        !e.pessoaNome.toLowerCase().includes(this.filtro.pessoa.toLowerCase())) return false;
      if (this.filtro.situacao && e.situacao !== this.filtro.situacao) return false;

      // filtro novo
      if (this.filtro.bibliotecaId && e.bibliotecaId !== this.filtro.bibliotecaId) return false;

      return true;
    });
  }

  limpar(): void {
    this.filtro = { tombo: '', titulo: '', pessoa: '', situacao: '', bibliotecaId: null };
    this.listaFiltrada = [...this.lista];
  }

  abrirDetalhes(id: number): void {
    this.router.navigate(['/gerenciar/emprestimos/detalhe', id]);
  }
}