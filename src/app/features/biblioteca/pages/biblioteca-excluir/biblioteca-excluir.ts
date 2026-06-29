import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Biblioteca } from '../../models/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-excluir',
  imports: [CommonModule],
  templateUrl: './biblioteca-excluir.html',
  styleUrl: './biblioteca-excluir.css',
})
export class BibliotecaExcluir implements OnInit {
  biblioteca: Biblioteca = { nome: '' };
  erro: string = '';

  constructor(
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bibliotecaService.buscarPorId(id).subscribe({
      next: (biblioteca) => {
        this.biblioteca = biblioteca;
        this.cdr.detectChanges();
      },
      error: (erro) => console.error(erro)
    });
  }

  excluir(): void {
    this.erro = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.bibliotecaService.excluir(id).subscribe({
      next: () => this.router.navigate(['/gerenciar/bibliotecas']),
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao excluir biblioteca.';
        this.cdr.detectChanges();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/bibliotecas']);
  }
}