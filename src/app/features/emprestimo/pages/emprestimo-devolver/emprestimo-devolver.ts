import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  erro: string = '';
  hoje = new Date().toISOString().split('T')[0];

  constructor(
    private emprestimoService: EmprestimoService,
    private router: Router
  ) {}

  devolver(): void {
    this.erro = '';
    this.emprestimoService.devolver(this.emprestimoId, this.devolucao).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/emprestimos']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao registrar devolução.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/emprestimos']);
  }
}
