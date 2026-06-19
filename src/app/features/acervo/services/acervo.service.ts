import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Acervo } from '../models/acervo';

@Injectable({
  providedIn: 'root'
})
export class AcervoService {

  private readonly apiUrl = 'http://localhost:8080/acervo';

  constructor(private http: HttpClient) { }

  listar(): Observable<Acervo[]> {
    return this.http.get<Acervo[]>(this.apiUrl);
  }

  pesquisar(
    titulo?: string,
    generoId?: number | null,
    bibliotecaId?: number | null,
    somenteDisponiveis?: boolean
  ): Observable<Acervo[]> {

    let params = new HttpParams();

    if (titulo?.trim()) {
      params = params.set('titulo', titulo.trim());
    }

    if (generoId) {
      params = params.set('generoId', generoId);
    }

    if (bibliotecaId) {
      params = params.set('bibliotecaId', bibliotecaId);
    }

    if (somenteDisponiveis) {
      params = params.set('situacao', 'DISPONIVEL');
    }

    return this.http.get<Acervo[]>(
      this.apiUrl,
      { params }
    );
  }
}