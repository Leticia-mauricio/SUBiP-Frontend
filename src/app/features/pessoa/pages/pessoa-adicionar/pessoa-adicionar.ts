import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Pessoa } from '../../models/pessoa';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoa-adicionar',
  imports: [FormsModule],
  templateUrl: './pessoa-adicionar.html',
  styleUrl: './pessoa-adicionar.css',
})
export class PessoaAdicionar {

  pessoa: Pessoa = { nome: '', cpf: '', email: '' };
  erro: string = '';

  constructor(
    private pessoaService: PessoaService,
    private router: Router
  ) {}

  salvar(): void {
    this.erro = '';
    this.pessoaService.salvar(this.pessoa).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/pessoas']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao salvar pessoa.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/pessoas']);
  }
}
