import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly url = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.url);
  }

  buscarPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.url}/${id}`);
  }

  salvar(pessoa: Pessoa): Observable<Pessoa> {
    if (pessoa.id) {
      return this.http.put<Pessoa>(`${this.url}/${pessoa.id}`, pessoa);
    }
    return this.http.post<Pessoa>(this.url, pessoa);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
