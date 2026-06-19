import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Genero } from '../models/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private readonly apiUrl = 'http://localhost:8080/generos';

  constructor(private http: HttpClient) { }

  //lista todas as Generos
  listar(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Genero> {
    return this.http.get<Genero>(`${this.apiUrl}/${id}`);
  }

  salvar(Genero: Genero): Observable<Genero> {
    if (Genero.id) {
        return this.http.put<Genero>(`${this.apiUrl}/${Genero.id}`, Genero);
    }
    
    return this.http.post<Genero>( this.apiUrl, Genero);
  }

  //cadastra uma Genero nova
  criar(Genero: Genero): Observable<Genero> {
    return this.http.post<Genero>(this.apiUrl, Genero);
  }

  //atualiza uma Genero já existente
  atualizar(id: number, Genero: Genero): Observable<Genero> {
    return this.http.put<Genero>(`${this.apiUrl}/${id}`, Genero);
  }
  
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
