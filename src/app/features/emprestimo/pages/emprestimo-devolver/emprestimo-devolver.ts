import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EmprestimoService } from '../../services/emprestimo.service';
import { EmprestimoDevolucao } from '../../models/emprestimo-devolucao';
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

@Component({
  selector: 'app-emprestimo-devolver',
  imports: [FormsModule],
  templateUrl: './emprestimo-devolver.html',
  styleUrl: './emprestimo-devolver.css'
})
export class EmprestimoDevolver implements OnInit {

  tombo = '';

  emprestimoId = 0;

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

  emprestimoEncontrado = false;

  devolucao: EmprestimoDevolucao = {
    dataDevolucao: ''
  };

  erro: string = '';
  hoje = new Date().toISOString().split('T')[0];

  constructor(
    private emprestimoService: EmprestimoService,
    private exemplarService: ExemplarService,
    private livroService: LivroService,
    private pessoaService: PessoaService,
    private bibliotecaService: BibliotecaService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //this.devolucao.dataDevolucao = new Date().toISOString().split('T')[0];
    this.devolucao.dataDevolucao = this.hoje;

    this.emprestimoService.listar().subscribe(e => this.emprestimos = e);

    this.exemplarService.listar().subscribe(e => this.exemplares = e);

    this.livroService.listar().subscribe(l => this.livros = l);

    this.pessoaService.listar().subscribe(p => this.pessoas = p);

    this.bibliotecaService.listar().subscribe(b => this.bibliotecas = b);

  }

  buscarExemplar(): void {
    this.emprestimoEncontrado = false;
    this.erro = '';

    const exemplar = this.exemplares.find(e => e.tombo === this.tombo);

    if (!exemplar) {
      this.erro = this.tombo.length > 0 ? 'Tombo não encontrado.' : '';
      return;
    }

    const emprestimo = this.emprestimos.find(
      e => e.exemplarId === exemplar.id &&
        e.situacao !== SituacaoEmprestimo.DEVOLVIDO
    );

    if (!emprestimo) {
      this.erro = 'Não existe empréstimo ativo para esse exemplar.';
      return;
    }

    // limpa erro e preenche os dados
    this.erro = '';
    this.emprestimoId = emprestimo.id!;
    const livro = this.livros.find(l => l.id === exemplar.livroId);
    const pessoa = this.pessoas.find(p => p.id === emprestimo.pessoaId);
    const biblioteca = this.bibliotecas.find(b => b.id === exemplar.bibliotecaId);
    this.tituloLivro = livro?.titulo ?? '';
    this.nomeLeitor = pessoa?.nome ?? '';
    this.nomeBiblioteca = biblioteca?.nome ?? '';
    this.dataRetirada = emprestimo.dataRetirada;
    this.dataPrevista = emprestimo.dataDevolucaoPrevista;

    const hoje = new Date();
    const prevista = new Date(emprestimo.dataDevolucaoPrevista);
    this.diasAtraso = Math.floor(
      (hoje.getTime() - prevista.getTime()) / (1000 * 60 * 60 * 24)
    );
    this.atrasado = this.diasAtraso > 0;
    this.emprestimoEncontrado = true;
  }

  mostrarConfirmacao = false;

  devolver(): void {
    this.mostrarConfirmacao = true;
  }

  confirmar(): void {
    this.mostrarConfirmacao = false;
    this.erro = '';
    this.emprestimoService.devolver(this.emprestimoId, this.devolucao).subscribe({
      next: () => this.router.navigate(['/gerenciar/emprestimos']),
      error: (erro) => this.erro = erro?.error?.message || 'Erro ao registrar devolução.'
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/emprestimos']);
  }
}
