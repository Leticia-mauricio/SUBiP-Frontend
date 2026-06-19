import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private exemplarService: ExemplarService
  ) { }

  salvar(): void {
    this.exemplarService
      .salvar(this.exemplar)
      .subscribe({
        next: (resposta) => {
          console.log('Exemplar salvo', resposta);
        },
        error: (erro) => {
          console.error('Erro', erro);
        }
      });
  }
}
