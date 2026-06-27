import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmprestimoService } from '../../services/emprestimo.service';
import { forkJoin } from 'rxjs';
import { PessoaService } from '../../../pessoa/services/pessoa.service';
import { ExemplarService } from '../../../exemplar/services/exemplar.service';
import { LivroService } from '../../../livro/services/livro.service';
import { EmprestimoListagem } from '../../models/emprestimo-listagem';


@Component({
  selector: 'app-emprestimo-listar',
  imports: [RouterLink],
  templateUrl: './emprestimo-listar.html',
  styleUrl: './emprestimo-listar.css',
})
export class EmprestimoListar implements OnInit {

  emprestimos: EmprestimoListagem[] = [];

  constructor(
    private emprestimoService: EmprestimoService,
    private pessoaService: PessoaService,
    private exemplarService: ExemplarService,
    private livroService: LivroService
  ) { }

  ngOnInit(): void {
    this.listar();
  }


  listar(): void {

    this.emprestimoService.listar().subscribe({
      next: (emprestimos) => {

        this.emprestimos = [];

        emprestimos.forEach(emprestimo => {

          forkJoin({
            pessoa: this.pessoaService.buscarPorId(emprestimo.pessoaId),
            exemplar: this.exemplarService.buscarPorId(emprestimo.exemplarId)
          }).subscribe(({ pessoa, exemplar }) => {

            this.livroService.buscarPorId(exemplar.idLivro).subscribe(livro => {

              this.emprestimos.push({
                ...emprestimo,
                pessoaNome: pessoa.nome,
                titulo: livro.titulo
              });

            });

          });

        });

      },
      error: (erro) => {
        console.error('Erro ao carregar empréstimos', erro);
      }
    });

  }
}
