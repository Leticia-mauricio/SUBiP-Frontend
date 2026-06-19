import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmprestimoService } from '../../services/emprestimo.service';
import { EmprestimoRenovacao } from '../../models/emprestimo-renovacao';

@Component({
  selector: 'app-emprestimo-renovar',
  imports: [FormsModule],
  templateUrl: './emprestimo-renovar.html',
  styleUrl: './emprestimo-renovar.css'
})
export class EmprestimoRenovar {

  emprestimoId = 0;

  renovacao: EmprestimoRenovacao = {
    dataDevolucaoPrevista: ''
  };

  constructor(
    private emprestimoService: EmprestimoService
  ) {}

  renovar(): void {

    this.emprestimoService
      .renovar(
        this.emprestimoId,
        this.renovacao
      )
      .subscribe({
        next: (resposta) => {
          console.log('Empréstimo renovado', resposta);
        },
        error: (erro) => {
          console.error(erro);
        }
      });

  }

}