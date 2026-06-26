import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private emprestimoService: EmprestimoService
  ) { }

  //dataAtual = new Date();
  
  hoje = new Date().toLocaleDateString('pt-BR');

  get dataDevolucaoPrevista(): string {
    const data = new Date();
    data.setDate(data.getDate() + 15);

    return data.toLocaleDateString('pt-BR');
  }

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
