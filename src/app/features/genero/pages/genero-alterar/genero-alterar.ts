import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Genero } from '../../models/genero';
import { GeneroService } from '../../services/genero.service';

@Component({
  selector: 'app-genero-alterar',
  imports: [FormsModule],
  templateUrl: './genero-alterar.html',
  styleUrl: './genero-alterar.css',
})
export class GeneroAlterar implements OnInit {

  genero: Genero = { descricao: '' };
  erro: string = '';

  constructor(
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.generoService.buscarPorId(id).subscribe({
      next: (genero) => { this.genero = genero; },
      error: (erro) => { console.error(erro); }
    });
  }

  salvar(): void {
    this.erro = '';
    this.generoService.salvar(this.genero).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/generos']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao alterar gênero.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/generos']);
  }
}
