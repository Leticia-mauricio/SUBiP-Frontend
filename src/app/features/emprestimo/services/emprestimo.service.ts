import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Emprestimo } from '../models/emprestimo';
import { EmprestimoRenovacao } from '../models/emprestimo-renovacao';
import { EmprestimoDevolucao } from '../models/emprestimo-devolucao';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  private readonly apiUrl = 'http://localhost:8080/emprestimos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Emprestimo> {
    return this.http.get<Emprestimo>(`${this.apiUrl}/${id}`);
  }

  salvar(emprestimo: Emprestimo): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(
      this.apiUrl,
      emprestimo
    );
  }

  renovar(
    id: number,
    renovacao: EmprestimoRenovacao
  ): Observable<Emprestimo> {

    return this.http.put<Emprestimo>(
      `${this.apiUrl}/${id}/renovacao`,
      renovacao
    );
  }

  devolver(
    id: number,
    devolucao: EmprestimoDevolucao
  ): Observable<Emprestimo> {

    return this.http.put<Emprestimo>(
      `${this.apiUrl}/${id}/devolucao`,
      devolucao
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}