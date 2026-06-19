import { Component } from '@angular/core';
import { Biblioteca } from '../../models/biblioteca'
import { FormsModule } from '@angular/forms';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-adicionar',
  imports: [FormsModule],
  templateUrl: './biblioteca-adicionar.html',
  styleUrl: './biblioteca-adicionar.css',
})
export class BibliotecaAdicionar {
  biblioteca: Biblioteca = {
    nome: ''
  };

  constructor(
    private bibliotecaService: BibliotecaService
  ) { }

  salvar(): void {
    this.bibliotecaService
      .salvar(this.biblioteca)
      .subscribe({
        next: (resposta) => {
          console.log('Biblioteca salva', resposta);
        },
        error: (erro) => {
          console.error('Erro', erro);
        }
      });
  }
}
