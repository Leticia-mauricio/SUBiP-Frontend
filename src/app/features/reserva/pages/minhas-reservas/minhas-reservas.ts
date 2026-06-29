import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SituacaoReserva } from '../../models/situacao-reserva';
import { ReservaService } from '../../services/reserva.service';
import { MinhaReserva } from '../../models/minha-reserva';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-minhas-reservas',
  imports: [RouterLink, CommonModule],
  templateUrl: './minhas-reservas.html',
  styleUrl: './minhas-reservas.css'
})
export class MinhasReservas implements OnInit {

  reservasAtivas: MinhaReserva[] = [];

  historicoReservas: MinhaReserva[] = [];

  carregando = true;

  constructor(
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    this.carregarReservas();
  }

  carregarReservas(): void {
    // Enquanto não houver autenticação
    const pessoaId = 1;

    this.reservaService
      .listarPorLeitor(pessoaId).subscribe({next: (reservas) => {
          this.reservasAtivas = reservas.filter(r => r.situacao === SituacaoReserva.ATIVA);

          this.historicoReservas = reservas.filter(r => r.situacao !== SituacaoReserva.ATIVA);

          this.ordenarListas();

          this.carregando = false;
        },

        error: erro => {
          console.error('Erro ao carregar reservas.', erro);
          this.carregando = false;
        }
      });
  }

  ordenarListas(): void {
    this.reservasAtivas.sort((a, b) =>
      new Date(a.dataReserva).getTime() - new Date(b.dataReserva).getTime()
    );
    this.historicoReservas.sort((a, b) =>
      new Date(b.dataReserva).getTime() - new Date(a.dataReserva).getTime()
    );
  }

  cancelarReserva(id: number): void {
    this.reservaService.cancelar(id).subscribe({
      next: () => this.carregarReservas(),
      error: erro => console.error('Erro ao cancelar reserva.', erro)
    });
  }

  possuiReservasAtivas(): boolean {
    return this.reservasAtivas.length > 0;
  }

  possuiHistorico(): boolean {
    return this.historicoReservas.length > 0;
  }

}