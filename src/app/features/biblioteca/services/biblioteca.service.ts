import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Biblioteca } from '../models/biblioteca';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  private readonly apiUrl = 'http://localhost:8080/bibliotecas';

  constructor(private http: HttpClient) { }

  //lista todas as bibliotecas
  listar(): Observable<Biblioteca[]> {
    return this.http.get<Biblioteca[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Biblioteca> {
    return this.http.get<Biblioteca>(`${this.apiUrl}/${id}`);
  }

  salvar(Biblioteca: Biblioteca): Observable<Biblioteca> {
    if (Biblioteca.id) {
        return this.http.put<Biblioteca>(`${this.apiUrl}/${Biblioteca.id}`, Biblioteca);
    }
    
    return this.http.post<Biblioteca>( this.apiUrl, Biblioteca);
  }

  //cadastra uma biblioteca nova
  criar(Biblioteca: Biblioteca): Observable<Biblioteca> {
    return this.http.post<Biblioteca>(this.apiUrl, Biblioteca);
  }

  //atualiza uma biblioteca já existente
  atualizar(id: number, Biblioteca: Biblioteca): Observable<Biblioteca> {
    return this.http.put<Biblioteca>(`${this.apiUrl}/${id}`, Biblioteca);
  }
  
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
