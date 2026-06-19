import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Exemplar } from '../../models/exemplar';
import { ExemplarService } from '../../services/exemplar.service';

@Component({
  selector: 'app-exemplar-listar',
  imports: [CommonModule, RouterLink],
  templateUrl: './exemplar-listar.html',
  styleUrl: './exemplar-listar.css',
})
export class ExemplarListar implements OnInit {

  exemplares: Exemplar[] = [];

  constructor(
    private exemplareservice: ExemplarService
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {

    this.exemplareservice
      .listar()
      .subscribe({
        next: (exemplares) => {
          this.exemplares = exemplares;
        },
        error: (erro) => {
          console.error(erro);
        }
      });

  }

}