import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-reserva-cancelar',
  imports: [],
  templateUrl: './reserva-cancelar.html',
  styleUrl: './reserva-cancelar.css',
})
export class ReservaCancelar implements OnInit {

  reserva: any = null;
  erro: string = '';

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.reservaService.buscarPorId(id).subscribe({
      next: (reserva) => {
        console.log(reserva); // adicionar aqui
        this.reserva = reserva;
      },
      error: (erro) => { console.error(erro); }
    });
  }

  cancelar(): void {
    this.erro = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.reservaService.cancelar(id).subscribe({
      next: () => {
        this.router.navigate(['/gerenciar/reservas']);
      },
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao cancelar reserva.';
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/gerenciar/reservas']);
  }
}
