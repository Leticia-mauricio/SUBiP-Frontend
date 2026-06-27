import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EmprestimoService } from '../../services/emprestimo.service';
import { EmprestimoRenovacao } from '../../models/emprestimo-renovacao';
import { Emprestimo } from '../../models/emprestimo';
import { Exemplar } from '../../../exemplar/models/exemplar';
import { Livro } from '../../../livro/models/livro';
import { Pessoa } from '../../../pessoa/models/pessoa';
import { Biblioteca } from '../../../biblioteca/models/biblioteca';
import { ExemplarService } from '../../../exemplar/services/exemplar.service';
import { LivroService } from '../../../livro/services/livro.service';
import { PessoaService } from '../../../pessoa/services/pessoa.service';
import { BibliotecaService } from '../../../biblioteca/services/biblioteca.service';

@Component({
  selector: 'app-emprestimo-renovar',
  imports: [FormsModule],
  templateUrl: './emprestimo-renovar.html',
  styleUrl: './emprestimo-renovar.css'
})
export class EmprestimoRenovar implements OnInit {

  tombo = '';
  emprestimoId = 0;

  emprestimoEncontrado = false;

  emprestimos: Emprestimo[] = [];
  exemplares: Exemplar[] = [];
  livros: Livro[] = [];
  pessoas: Pessoa[] = [];
  bibliotecas: Biblioteca[] = [];

  tituloLivro = '';
  nomeLeitor = '';
  nomeBiblioteca = '';

  dataRetirada = '';
  dataPrevista = '';

  atrasado = false;
  diasAtraso = 0;

  renovacao: EmprestimoRenovacao = {
    dataDevolucaoPrevista: ''
  };

  erro: string = '';

  constructor(
    private emprestimoService: EmprestimoService,
    private exemplarService: ExemplarService,
    private livroService: LivroService,
    private pessoaService: PessoaService,
    private bibliotecaService: BibliotecaService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.emprestimoService.listar().subscribe(e => this.emprestimos = e);

    this.exemplarService.listar().subscribe(e => this.exemplares = e);

    this.livroService.listar().subscribe(l => this.livros = l);

    this.pessoaService.listar().subscribe(p => this.pessoas = p);

    this.bibliotecaService.listar().subscribe(b => this.bibliotecas = b);

  }

  buscarExemplar(): void {

    this.emprestimoEncontrado = false;

    const exemplar = this.exemplares.find(
      e => e.tombo === this.tombo
    );

    if (!exemplar) {
      this.erro = 'Tombo não encontrado.';
      return;
    }

    const emprestimo = this.emprestimos.find(
      e =>
        e.exemplarId === exemplar.id &&
        e.situacao !== SituacaoEmprestimo.DEVOLVIDO
    );

    if (!emprestimo) {
      this.erro = 'Não existe empréstimo ativo para esse exemplar.';
      return;
    }

    this.emprestimoId = emprestimo.id!;

    const livro = this.livros.find(l => l.id === exemplar.idLivro);

    const pessoa = this.pessoas.find(p => p.id === emprestimo.pessoaId);

    const biblioteca = this.bibliotecas.find(
      b => b.id === exemplar.idBiblioteca
    );

    this.tituloLivro = livro?.titulo ?? '';

    this.nomeLeitor = pessoa?.nome ?? '';

    this.nomeBiblioteca = biblioteca?.nome ?? '';

    this.dataRetirada = emprestimo.dataRetirada;

    this.dataPrevista = emprestimo.dataDevolucaoPrevista;

    const hoje = new Date();

    const prevista = new Date(emprestimo.dataDevolucaoPrevista);

    this.diasAtraso = Math.floor(
      (hoje.getTime() - prevista.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    this.atrasado = this.diasAtraso > 0;

    this.emprestimoEncontrado = true;

    const novaData = new Date(emprestimo.dataDevolucaoPrevista);
    novaData.setDate(novaData.getDate() + 15);

    this.renovacao.dataDevolucaoPrevista = novaData
      .toISOString()
      .split('T')[0];
  }

  renovar(): void {
    this.erro = '';
    this.emprestimoService.renovar(this.emprestimoId, this.renovacao).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/emprestimos']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao renovar empréstimo.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/emprestimos']);
  }
}
