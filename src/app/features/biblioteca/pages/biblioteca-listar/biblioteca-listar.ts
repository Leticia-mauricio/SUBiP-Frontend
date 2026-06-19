import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Biblioteca } from '../../models/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-listar',
  imports: [CommonModule, RouterLink],
  templateUrl: './biblioteca-listar.html',
  styleUrl: './biblioteca-listar.css',
})
export class BibliotecaListar implements OnInit {

  bibliotecas: Biblioteca[] = [];

  constructor(
    private bibliotecaService: BibliotecaService
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {

    this.bibliotecaService
      .listar()
      .subscribe({
        next: (bibliotecas) => {
          this.bibliotecas = bibliotecas;
        },
        error: (erro) => {
          console.error(erro);
        }
      });

  }

}