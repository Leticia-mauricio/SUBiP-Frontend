import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  erro: string = '';

  constructor(
    private ExemplarService: ExemplarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.ExemplarService.buscarPorId(id).subscribe({
      next: (exemplar) => { this.exemplar = exemplar; },
      error: (erro) => { console.error(erro); }
    });
  }

  salvar(): void {
    this.erro = '';
    this.ExemplarService.salvar(this.exemplar).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/exemplares']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao alterar exemplar.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/exemplares']);
  }
}
