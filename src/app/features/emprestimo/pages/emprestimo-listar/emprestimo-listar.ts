import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo';

import { Exemplar } from '../../../exemplar/models/exemplar';
import { Livro } from '../../../livro/models/livro';
import { Pessoa } from '../../../pessoa/models/pessoa';
import { Biblioteca } from '../../../biblioteca/models/biblioteca';

import { ExemplarService } from '../../../exemplar/services/exemplar.service';
import { LivroService } from '../../../livro/services/livro.service';
import { PessoaService } from '../../../pessoa/services/pessoa.service';
import { BibliotecaService } from '../../../biblioteca/services/biblioteca.service';

import { SituacaoEmprestimo } from '../../models/situacao-emprestimo';

export interface EmprestimoListagemView {
  id: number;
  titulo: string;
  tombo: string;
  pessoaNome: string;
  situacao: SituacaoEmprestimo;
  dataRetirada: string;
  dataDevolucaoPrevista: string;
}

@Component({
  selector: 'app-emprestimo-listar',
  templateUrl: './emprestimo-listar.html',
  styleUrls: ['./emprestimo-listar.css']
})
export class EmprestimoListar implements OnInit {

  emprestimos: Emprestimo[] = [];
  exemplares: Exemplar[] = [];
  livros: Livro[] = [];
  pessoas: Pessoa[] = [];
  bibliotecas: Biblioteca[] = [];

  lista: EmprestimoListagemView[] = [];
  listaFiltrada: EmprestimoListagemView[] = [];

  filtro = {
    tombo: '',
    titulo: '',
    pessoa: '',
    situacao: ''
  };

  constructor(
    private emprestimoService: EmprestimoService,
    private exemplarService: ExemplarService,
    private livroService: LivroService,
    private pessoaService: PessoaService,
    private bibliotecaService: BibliotecaService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.emprestimoService.listar()
      .subscribe(e => this.emprestimos = e);

    this.exemplarService.listar()
      .subscribe(e => this.exemplares = e);

    this.livroService.listar()
      .subscribe(l => this.livros = l);

    this.pessoaService.listar()
      .subscribe(p => this.pessoas = p);

    this.bibliotecaService.listar()
      .subscribe(b => this.bibliotecas = b);

    // espera leve pra montar (simples e funcional no teu padrão atual)
    setTimeout(() => this.montarLista(), 500);
  }

  montarLista(): void {

    this.lista = this.emprestimos.map(emp => {

      const exemplar = this.exemplares.find(
        e => e.id === emp.exemplarId
      );

      const livro = this.livros.find(
        l => l.id === exemplar?.idLivro
      );

      const pessoa = this.pessoas.find(
        p => p.id === emp.pessoaId
      );

      return {
        id: emp.id!,

        titulo: livro?.titulo ?? 'Livro não encontrado',
        tombo: exemplar?.tombo ?? 'Sem tombo',

        pessoaNome: pessoa?.nome ?? 'Pessoa não encontrada',

        situacao: emp.situacao,

        dataRetirada: emp.dataRetirada,
        dataDevolucaoPrevista: emp.dataDevolucaoPrevista
      };
    });

    this.listaFiltrada = [...this.lista];
  }

  pesquisar(): void {

    this.listaFiltrada = this.lista.filter(e => {

      if (this.filtro.tombo &&
        !e.tombo.toLowerCase().includes(this.filtro.tombo.toLowerCase())) {
        return false;
      }

      if (this.filtro.titulo &&
        !e.titulo.toLowerCase().includes(this.filtro.titulo.toLowerCase())) {
        return false;
      }

      if (this.filtro.pessoa &&
        !e.pessoaNome.toLowerCase().includes(this.filtro.pessoa.toLowerCase())) {
        return false;
      }

      if (this.filtro.situacao &&
        e.situacao !== this.filtro.situacao) {
        return false;
      }

      return true;
    });
  }

  limpar(): void {
    this.filtro = {
      tombo: '',
      titulo: '',
      pessoa: '',
      situacao: ''
    };

    this.listaFiltrada = [...this.lista];
  }

  abrirDetalhes(id: number): void {
    this.router.navigate(['/gerenciar/emprestimos/detalhe', id]);
  }
}