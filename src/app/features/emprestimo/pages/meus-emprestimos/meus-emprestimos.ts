import { Component, OnInit } from '@angular/core';

import { MeuEmprestimo } from '../../models/meu-emprestimo';
import { SituacaoEmprestimo } from '../../models/situacao-emprestimo';
import { EmprestimoService } from '../../services/emprestimo.service';

@Component({
  selector: 'app-meus-emprestimos',
  imports: [],
  templateUrl: './meus-emprestimos.html',
  styleUrl: './meus-emprestimos.css'
})
export class MeusEmprestimos implements OnInit {

  emprestimosAtivos: MeuEmprestimo[] = [];

  historicoEmprestimos: MeuEmprestimo[] = [];

  carregando = true;

  constructor(
    private emprestimoService: EmprestimoService
  ) { }

  ngOnInit(): void {
    this.carregarEmprestimos();
  }

  carregarEmprestimos(): void {

    // Enquanto não houver login:
    const pessoaId = 1;

    this.emprestimoService
      .listarPorLeitor(pessoaId)
      .subscribe({

        next: (emprestimos) => {

          this.emprestimosAtivos = emprestimos.filter(
            e => e.situacao === SituacaoEmprestimo.EM_ANDAMENTO
          );

          this.historicoEmprestimos = emprestimos.filter(
            e => e.situacao !== SituacaoEmprestimo.EM_ANDAMENTO
          );

          this.ordenarListas();

          this.carregando = false;

        },

        error: erro => {

          console.error(
            'Erro ao carregar empréstimos.',
            erro
          );

          this.carregando = false;

        }

      });

  }

  ordenarListas(): void {

    this.emprestimosAtivos.sort((a, b) =>
      new Date(a.dataDevolucaoPrevista).getTime() -
      new Date(b.dataDevolucaoPrevista).getTime()
    );

    this.historicoEmprestimos.sort((a, b) =>
      new Date(b.dataRetirada).getTime() -
      new Date(a.dataRetirada).getTime()
    );

  }

  possuiEmprestimosAtivos(): boolean {
    return this.emprestimosAtivos.length > 0;
  }

  possuiHistorico(): boolean {
    return this.historicoEmprestimos.length > 0;
  }

}