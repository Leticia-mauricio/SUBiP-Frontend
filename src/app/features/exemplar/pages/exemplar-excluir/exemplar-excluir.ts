import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  erro: string = '';

  constructor(
    private ExemplarService: ExemplarService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ExemplarService.buscarPorId(id).subscribe({
      next: (exemplar) => { this.exemplar = exemplar; },
      error: (erro) => { console.error(erro); }
    });
  }

  excluir(): void {
    this.erro = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.ExemplarService.excluir(id).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/exemplares']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao excluir exemplar.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/exemplares']);
  }
}
