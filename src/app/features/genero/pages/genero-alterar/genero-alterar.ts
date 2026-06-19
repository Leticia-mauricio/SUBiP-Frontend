import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Genero } from '../../models/genero';
import { GeneroService } from '../../services/genero.service';

@Component({
  selector: 'app-genero-alterar',
  imports: [FormsModule],
  templateUrl: './genero-alterar.html',
  styleUrl: './genero-alterar.css',
})
export class GeneroAlterar implements OnInit {

  genero: Genero = {
    descricao: ''
  };

  constructor(
    private generoService: GeneroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) return;

    this.generoService
      .buscarPorId(id)
      .subscribe({
        next: (genero) => {
          this.genero = genero;
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }

  salvar(): void {

    this.generoService
      .salvar(this.genero)
      .subscribe({
        next: (genero) => {
          console.log('genero atualizada', genero);
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }
}