import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmprestimoService } from '../../services/emprestimo.service';
import { EmprestimoDevolucao } from '../../models/emprestimo-devolucao';

@Component({
  selector: 'app-emprestimo-devolver',
  imports: [FormsModule],
  templateUrl: './emprestimo-devolver.html',
  styleUrl: './emprestimo-devolver.css'
})
export class EmprestimoDevolver {

  emprestimoId = 0;

  devolucao: EmprestimoDevolucao = {
    dataDevolucao: ''
  };

  constructor(
    private emprestimoService: EmprestimoService
  ) {}

  devolver(): void {

    this.emprestimoService
      .devolver(
        this.emprestimoId,
        this.devolucao
      )
      .subscribe({
        next: (resposta) => {
          console.log('Livro devolvido', resposta);
        },
        error: (erro) => {
          console.error(erro);
        }
      });

  }

}