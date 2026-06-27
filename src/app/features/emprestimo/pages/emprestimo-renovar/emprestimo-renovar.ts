import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  erro: string = '';

  constructor(
    private emprestimoService: EmprestimoService,
    private router: Router
  ) {}

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
