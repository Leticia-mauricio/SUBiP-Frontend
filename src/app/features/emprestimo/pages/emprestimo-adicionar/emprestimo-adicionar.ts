import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EmprestimoService } from '../../services/emprestimo.service';
import { EmprestimoCadastro } from '../../models/emprestimo-cadastro';

@Component({
  selector: 'app-emprestimo-adicionar',
  imports: [FormsModule],
  templateUrl: './emprestimo-adicionar.html',
  styleUrl: './emprestimo-adicionar.css',
})
export class EmprestimoAdicionar {

  emprestimo: EmprestimoCadastro = {
    dataRetirada: '',
    exemplarId: 0,
    pessoaId: 0
  };

  erro: string = '';

  hoje = new Date().toLocaleDateString('pt-BR');

  get dataDevolucaoPrevista(): string {
    const data = new Date();
    data.setDate(data.getDate() + 15);
    return data.toLocaleDateString('pt-BR');
  }

  constructor(
    private emprestimoService: EmprestimoService,
    private router: Router
  ) { }

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
