import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Genero } from '../../models/genero'
import { GeneroService } from '../../services/genero.service';

@Component({
  selector: 'app-genero-adicionar',
  imports: [FormsModule],
  templateUrl: './genero-adicionar.html',
  styleUrl: './genero-adicionar.css',
})
export class GeneroAdicionar {
  genero: Genero = { descricao: '' };
  erro: string = '';

  constructor(
    private generoService: GeneroService,
    private router: Router
  ) { }

  salvar(): void {
    this.erro = '';
    this.generoService.salvar(this.genero).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/generos']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao salvar gênero.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/generos']);
  }
}
