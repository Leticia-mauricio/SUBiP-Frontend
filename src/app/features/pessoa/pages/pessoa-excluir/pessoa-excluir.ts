import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pessoa } from '../../models/pessoa';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoa-excluir',
  imports: [],
  templateUrl: './pessoa-excluir.html',
  styleUrl: './pessoa-excluir.css',
})
export class PessoaExcluir implements OnInit {

  pessoa: Pessoa = { nome: '', cpf: '', email: '' };
  erro: string = '';

  constructor(
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.pessoaService.buscarPorId(id).subscribe({
      next: (pessoa) => { this.pessoa = pessoa; },
      error: (erro) => { console.error(erro); }
    });
  }

  excluir(): void {
    this.erro = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.pessoaService.excluir(id).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/pessoas']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao excluir pessoa.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/pessoas']);
  }
}
