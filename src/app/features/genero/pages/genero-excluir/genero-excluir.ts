import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Genero } from '../../models/genero';
import { GeneroService } from '../../services/genero.service';

@Component({
  selector: 'app-genero-excluir',
  imports: [],
  templateUrl: './genero-excluir.html',
  styleUrl: './genero-excluir.css',
})
export class GeneroExcluir implements OnInit {

  genero: Genero = {
    descricao: ''
  };

  constructor(
    private generoService: GeneroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

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

  excluir(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) return;

    this.generoService
      .excluir(id)
      .subscribe({
        next: () => {
          console.log('Genero excluído');
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }
}