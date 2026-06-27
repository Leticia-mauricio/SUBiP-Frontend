import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Exemplar } from '../../models/exemplar'
import { ExemplarService } from '../../services/exemplar.service';
import { SituacaoExemplar } from '../../models/situacao-exemplar';

@Component({
  selector: 'app-Exemplar-adicionar',
  imports: [FormsModule],
  templateUrl: './Exemplar-adicionar.html',
  styleUrl: './Exemplar-adicionar.css',
})
export class ExemplarAdicionar {
  
  exemplar: Exemplar = {
    tombo: '', 
    situacao: SituacaoExemplar.DISPONIVEL,
    idLivro: 0,
    idBiblioteca: 0
  };

  erro: string = '';

  constructor(
    private exemplarService: ExemplarService,
    private router: Router
  ) { }

  salvar(): void {
    this.erro = '';
    this.exemplarService.salvar(this.exemplar).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/exemplares']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao salvar exemplar.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/exemplares']);
  }
}
