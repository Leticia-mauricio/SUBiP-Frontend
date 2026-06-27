import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Biblioteca } from '../../models/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-alterar',
  imports: [FormsModule],
  templateUrl: './biblioteca-alterar.html',
  styleUrl: './biblioteca-alterar.css',
})
export class BibliotecaAlterar implements OnInit {

  biblioteca: Biblioteca = { nome: '' };
  erro: string = '';

  constructor(
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.bibliotecaService.buscarPorId(id).subscribe({
      next: (biblioteca) => { this.biblioteca = biblioteca; },
      error: (erro) => { console.error(erro); }
    });
  }

  salvar(): void {
    this.erro = '';
    this.bibliotecaService.salvar(this.biblioteca).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/bibliotecas']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao alterar biblioteca.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/bibliotecas']);
  }
}
