import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';
import { ReservaView } from '../models/reserva-view';
import { MinhaReserva } from '../models/minha-reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private readonly apiUrl = 'http://localhost:8080/reservas';

  constructor(private http: HttpClient) {}

  listar(): Observable<ReservaView[]> {
    return this.http.get<ReservaView[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<ReservaView> {
    return this.http.get<ReservaView>(`${this.apiUrl}/${id}`);
  }

  salvar(reserva: Reserva): Observable<ReservaView> {
    return this.http.post<ReservaView>(this.apiUrl, reserva);
  }

  cancelar(id: number): Observable<ReservaView> {
    return this.http.put<ReservaView>(`${this.apiUrl}/${id}/cancelamento`, {});
  }

  listarPorLeitor(pessoaId: number): Observable<MinhaReserva[]> {
    return this.http.get<MinhaReserva[]>(`${this.apiUrl}/leitor/${pessoaId}`);
  }
}