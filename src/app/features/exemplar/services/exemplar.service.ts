import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Exemplar } from '../models/exemplar';

@Injectable({
  providedIn: 'root'
})
export class ExemplarService {

  private readonly apiUrl = 'http://localhost:8080/exemplares';

  constructor(private http: HttpClient) {}

  listar(): Observable<Exemplar[]> {
    return this.http.get<Exemplar[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Exemplar> {
    return this.http.get<Exemplar>(`${this.apiUrl}/${id}`);
  }

  criar(exemplar: Exemplar): Observable<Exemplar> {
    return this.http.post<Exemplar>(this.apiUrl, exemplar);
  }

  atualizar(id: number, exemplar: Exemplar): Observable<Exemplar> {
    return this.http.put<Exemplar>(
      `${this.apiUrl}/${id}`,
      exemplar
    );
  }

  salvar(exemplar: Exemplar): Observable<Exemplar> {
    if (exemplar.id) {
      return this.atualizar(exemplar.id, exemplar);
    }

    return this.criar(exemplar);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}