import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Genero } from '../../models/genero';
import { GeneroService } from '../../services/genero.service';

@Component({
  selector: 'app-genero-excluir',
  imports: [],
  templateUrl: './genero-excluir.html',
  styleUrl: './genero-excluir.css',
})
export class GeneroExcluir implements OnInit {

  genero: Genero = { descricao: '' };
  erro: string = '';

  constructor(
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.generoService.buscarPorId(id).subscribe({
      next: (genero) => { this.genero = genero; },
      error: (erro) => { console.error(erro); }
    });
  }

  excluir(): void {
    this.erro = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.generoService.excluir(id).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/generos']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao excluir gênero.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/generos']);
  }
}
