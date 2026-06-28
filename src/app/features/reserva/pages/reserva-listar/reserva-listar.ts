import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ReservaView } from '../../models/reserva-view';
import { SituacaoReserva } from '../../models/situacao-reserva';
import { ReservaService } from '../../services/reserva.service';
import { BibliotecaService } from '../../../biblioteca/services/biblioteca.service';
import { Biblioteca } from '../../../biblioteca/models/biblioteca';

@Component({
  selector: 'app-reserva-listar',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './reserva-listar.html',
  styleUrl: './reserva-listar.css',
})
export class ReservaListar implements OnInit {
  lista: ReservaView[] = [];
  listaFiltrada: ReservaView[] = [];
  bibliotecas: Biblioteca[] = [];
  situacoes = Object.values(SituacaoReserva);

  filtro = {
    titulo: '',
    tombo: '',
    pessoa: '',
    bibliotecaId: null as number | null,
    situacao: ''
  };

  constructor(
    private reservaService: ReservaService,
    private bibliotecaService: BibliotecaService
  ) {}

  ngOnInit(): void {
    forkJoin({
      reservas: this.reservaService.listar(),
      bibliotecas: this.bibliotecaService.listar()
    }).subscribe({
      next: ({ reservas, bibliotecas }) => {
        this.lista = reservas as unknown as ReservaView[];
        this.listaFiltrada = [...this.lista];
        this.bibliotecas = bibliotecas;
      },
      error: (erro) => console.error(erro)
    });
  }

  pesquisar(): void {
    this.listaFiltrada = this.lista.filter(r => {
      if (this.filtro.titulo &&
        !r.tituloLivro.toLowerCase().includes(this.filtro.titulo.toLowerCase())) return false;
      if (this.filtro.tombo &&
        !r.tombo.toLowerCase().includes(this.filtro.tombo.toLowerCase())) return false;
      if (this.filtro.pessoa &&
        !r.pessoaNome.toLowerCase().includes(this.filtro.pessoa.toLowerCase())) return false;
      if (this.filtro.bibliotecaId && r.bibliotecaId !== this.filtro.bibliotecaId) return false;
      if (this.filtro.situacao && r.situacao !== this.filtro.situacao as any) return false;
      return true;
    });
  }

  limpar(): void {
    this.filtro = { titulo: '', tombo: '', pessoa: '', bibliotecaId: null, situacao: '' };
    this.listaFiltrada = [...this.lista];
  }
}