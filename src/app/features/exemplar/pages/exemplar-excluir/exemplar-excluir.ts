import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Exemplar } from '../../models/exemplar';
import { ExemplarService } from '../../services/exemplar.service';
import { SituacaoExemplar } from '../../models/situacao-exemplar';

@Component({
  selector: 'app-Exemplar-excluir',
  imports: [],
  templateUrl: './Exemplar-excluir.html',
  styleUrl: './Exemplar-excluir.css',
})
export class ExemplarExcluir implements OnInit {

  exemplar: Exemplar = {
    tombo: '', 
    situacao: SituacaoExemplar.DISPONIVEL,
    idLivro: 0,
    idBiblioteca: 0
  };

  constructor(
    private ExemplarService: ExemplarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ExemplarService
      .buscarPorId(id)
      .subscribe({
        next: (exemplar) => {
          this.exemplar = exemplar;
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }

  excluir(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) return;

    this.ExemplarService
      .excluir(id)
      .subscribe({
        next: () => {
          console.log('Exemplar excluído');
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }
}