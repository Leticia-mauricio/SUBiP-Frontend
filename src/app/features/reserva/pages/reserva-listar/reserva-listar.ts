import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva';

@Component({
  selector: 'app-reserva-listar',
  imports: [RouterLink],
  templateUrl: './reserva-listar.html',
  styleUrl: './reserva-listar.css',
})
export class ReservaListar implements OnInit {

  reservas: any[] = [];

  constructor(
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.reservaService.listar().subscribe({
      next: (reservas) => {
        this.reservas = reservas;
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }

}
