import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Biblioteca } from '../../models/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-excluir',
  imports: [],
  templateUrl: './biblioteca-excluir.html',
  styleUrl: './biblioteca-excluir.css',
})
export class BibliotecaExcluir implements OnInit {

  biblioteca: Biblioteca = { nome: '' };
  erro: string = '';

  constructor(
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bibliotecaService.buscarPorId(id).subscribe({
      next: (biblioteca) => { this.biblioteca = biblioteca; },
      error: (erro) => { console.error(erro); }
    });
  }

  excluir(): void {
    this.erro = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.bibliotecaService.excluir(id).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/bibliotecas']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao excluir biblioteca.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/bibliotecas']);
  }
}
