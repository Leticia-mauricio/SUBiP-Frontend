import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Emprestimo } from '../../models/emprestimo'
import { EmprestimoService } from '../../services/emprestimo.service';
import { SituacaoEmprestimo } from '../../models/situacao-emprestimo';

@Component({
  selector: 'app-emprestimo-adicionar',
  imports: [FormsModule],
  templateUrl: './emprestimo-adicionar.html',
  styleUrl: './emprestimo-adicionar.css',
})
export class EmprestimoAdicionar {
  
  emprestimo: Emprestimo = {
    dataRetirada: '', 
    dataDevolucaoPrevista: '',
    situacao: SituacaoEmprestimo.EM_ANDAMENTO,
    dataDevolucao: '',
    exemplarId: 0,
    pessoaId: 0,
    diasAtraso: 0
  };

  constructor(
    private emprestimoService: EmprestimoService
  ) { }

  salvar(): void {
    this.emprestimoService
      .salvar(this.emprestimo)
      .subscribe({
        next: (resposta) => {
          console.log('emprestimo salvo', resposta);
        },
        error: (erro) => {
          console.error('Erro', erro);
        }
      });
  }
}
