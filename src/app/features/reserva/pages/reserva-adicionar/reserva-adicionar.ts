import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva';
import { SituacaoReserva } from '../../models/situacao-reserva';

@Component({
  selector: 'app-reserva-adicionar',
  imports: [FormsModule],
  templateUrl: './reserva-adicionar.html',
  styleUrl: './reserva-adicionar.css',
})
export class ReservaAdicionar {

  reserva: Reserva = {
    situacao: SituacaoReserva.ATIVA,
    dataRegistro: '',
    exemplarId: 0,
    pessoaId: 0
  };

  erro: string = '';

  constructor(
    private reservaService: ReservaService,
    private router: Router
  ) {}

  salvar(): void {
    this.erro = '';
    this.reservaService.salvar(this.reserva).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/reservas']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao registrar reserva.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/reservas']);
  }
}
