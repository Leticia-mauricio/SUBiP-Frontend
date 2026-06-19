import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly apiUrl = 'http://localhost:8080/Livros';

  constructor(private http: HttpClient) { }

  //lista todas as Livros
  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  salvar(Livro: Livro): Observable<Livro> {
    if (Livro.id) {
        return this.http.put<Livro>(`${this.apiUrl}/${Livro.id}`, Livro);
    }
    
    return this.http.post<Livro>( this.apiUrl, Livro);
  }

  //cadastra um livro novo
  criar(Livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, Livro);
  }

  //atualiza um livro já existente
  atualizar(id: number, Livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${id}`, Livro);
  }
  
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
