import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EmprestimoService } from '../../services/emprestimo.service';
import { EmprestimoCadastro } from '../../models/emprestimo-cadastro';
import { Pessoa } from '../../../pessoa/models/pessoa';
import { PessoaService } from '../../../pessoa/services/pessoa.service';
import { Exemplar } from '../../../exemplar/models/exemplar';
import { Livro } from '../../../livro/models/livro';
import { ExemplarService } from '../../../exemplar/services/exemplar.service';
import { LivroService } from '../../../livro/services/livro.service';

@Component({
  selector: 'app-emprestimo-adicionar',
  imports: [FormsModule],
  templateUrl: './emprestimo-adicionar.html',
  styleUrl: './emprestimo-adicionar.css',
})
export class EmprestimoAdicionar implements OnInit {

  emprestimo: EmprestimoCadastro = {
    dataRetirada: '',
    exemplarId: 0,
    pessoaId: 0
  };

  erro: string = '';

  leitores: Pessoa[] = [];

  cpf = '';
  nomeLeitor = '';

  exemplares: Exemplar[] = [];
  livros: Livro[] = [];

  tombo = '';
  tituloLivro = '';

  hoje = new Date().toLocaleDateString('pt-BR');

  get dataDevolucaoPrevista(): string {
    const data = new Date();
    data.setDate(data.getDate() + 15);
    return data.toLocaleDateString('pt-BR');
  }

  constructor(
    private emprestimoService: EmprestimoService,
    private pessoaService: PessoaService,
    private exemplarService: ExemplarService,
    private livroService: LivroService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.pessoaService.listar().subscribe({
      next: pessoas => this.leitores = pessoas
    });

    this.exemplarService.listar().subscribe({
      next: exemplares => this.exemplares = exemplares
    });

    this.livroService.listar().subscribe({
      next: livros => this.livros = livros
    });

  }

  buscarLeitor(): void {

    const leitor = this.leitores.find(
      p => p.cpf.replace(/\D/g, '') === this.cpf.replace(/\D/g, '')
    );

    if (leitor) {
      this.nomeLeitor = leitor.nome;
      this.emprestimo.pessoaId = leitor.id!;
      this.erro = '';
    } else {
      this.nomeLeitor = '';
      this.emprestimo.pessoaId = 0;
      this.erro = 'Leitor não encontrado.';
    }

  }

  buscarExemplar(): void {

    const exemplar = this.exemplares.find(
      e => e.tombo === this.tombo
    );

    if (exemplar) {

      this.emprestimo.exemplarId = exemplar.id!;

      const livro = this.livros.find(
        l => l.id === exemplar.livroId
      );

      this.tituloLivro = livro ? livro.titulo : '';

    } else {

      this.emprestimo.exemplarId = 0;
      this.tituloLivro = '';

      this.erro = 'Exemplar não encontrado.';
    }

  }

  salvar(): void {
    this.erro = '';

    this.emprestimo.dataRetirada = new Date().toISOString().split('T')[0];

    this.emprestimoService.salvar(this.emprestimo).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/emprestimos']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao registrar empréstimo.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/emprestimos']);
  }
}
