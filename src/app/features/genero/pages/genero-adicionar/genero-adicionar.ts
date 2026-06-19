import { Component } from '@angular/core';
import { Genero } from '../../models/genero'
import { FormsModule } from '@angular/forms';
import { GeneroService } from '../../services/genero.service';

@Component({
  selector: 'app-genero-adicionar',
  imports: [FormsModule],
  templateUrl: './genero-adicionar.html',
  styleUrl: './genero-adicionar.css',
})
export class GeneroAdicionar {
  genero: Genero = {
    descricao: ''
  };

  constructor(
    private generoService: GeneroService
  ) { }

  salvar(): void {
    this.generoService
      .salvar(this.genero)
      .subscribe({
        next: (resposta) => {
          console.log('genero salva', resposta);
        },
        error: (erro) => {
          console.error('Erro', erro);
        }
      });
  }
}
