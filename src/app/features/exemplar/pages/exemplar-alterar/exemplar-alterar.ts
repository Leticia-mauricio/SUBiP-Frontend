import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Exemplar } from '../../models/exemplar';
import { ExemplarService } from '../../services/exemplar.service';
import { SituacaoExemplar } from '../../models/situacao-exemplar';

@Component({
  selector: 'app-Exemplar-alterar',
  imports: [FormsModule],
  templateUrl: './Exemplar-alterar.html',
  styleUrl: './Exemplar-alterar.css',
})
export class ExemplarAlterar implements OnInit {

  exemplar: Exemplar = {
    tombo: '', 
    situacao: SituacaoExemplar.DISPONIVEL,
    idLivro: 0,
    idBiblioteca: 0
  };

  constructor(
    private ExemplarService: ExemplarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) return;

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

  salvar(): void {

    this.ExemplarService
      .salvar(this.exemplar)
      .subscribe({
        next: (exemplar) => {
          console.log('Exemplar atualizado', exemplar);
        },
        error: (erro) => {
          console.error(erro);
        }
      });
  }
}