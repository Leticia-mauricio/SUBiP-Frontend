import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Reserva } from '../models/reserva';
import { MinhaReserva } from '../models/minha-reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private readonly apiUrl =
    'http://localhost:8080/reservas';

  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(
      `${this.apiUrl}/${id}`
    );
  }

  salvar(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(
      this.apiUrl,
      reserva
    );
  }

  cancelar(id: number): Observable<Reserva> {
    return this.http.put<Reserva>(
      `${this.apiUrl}/${id}/cancelamento`,
      {}
    );
  }

  listarPorLeitor(
    pessoaId: number
  ): Observable<MinhaReserva[]> {

    return this.http.get<MinhaReserva[]>(
      `${this.apiUrl}/leitor/${pessoaId}`
    );

  }

}