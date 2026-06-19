import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Genero } from '../../models/genero';
import { GeneroService } from '../../services/genero.service';

@Component({
  selector: 'app-genero-listar',
  imports: [CommonModule, RouterLink],
  templateUrl: './genero-listar.html',
  styleUrl: './genero-listar.css',
})
export class GeneroListar implements OnInit {

  generos: Genero[] = [];

  constructor(
    private generoservice: GeneroService
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {

    this.generoservice
      .listar()
      .subscribe({
        next: (generos) => {
          this.generos = generos;
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }

}