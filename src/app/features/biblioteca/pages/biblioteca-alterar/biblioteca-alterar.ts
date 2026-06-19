import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Biblioteca } from '../../models/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-alterar',
  imports: [FormsModule],
  templateUrl: './biblioteca-alterar.html',
  styleUrl: './biblioteca-alterar.css',
})
export class BibliotecaAlterar implements OnInit {

  biblioteca: Biblioteca = {
    nome: ''
  };

  constructor(
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) return;

    this.bibliotecaService
      .buscarPorId(id)
      .subscribe({
        next: (biblioteca) => {
          this.biblioteca = biblioteca;
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }

  salvar(): void {

    this.bibliotecaService
      .salvar(this.biblioteca)
      .subscribe({
        next: (biblioteca) => {
          console.log('Biblioteca atualizada', biblioteca);
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }
}