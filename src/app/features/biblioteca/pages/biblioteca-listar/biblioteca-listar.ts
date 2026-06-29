import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Biblioteca } from '../../models/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-listar',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './biblioteca-listar.html',
  styleUrl: './biblioteca-listar.css',
})
export class BibliotecaListar implements OnInit {
  lista: Biblioteca[] = [];
  listaFiltrada: Biblioteca[] = [];
  filtro = { nome: '' };

  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit(): void {
    this.bibliotecaService.listar().subscribe({
      next: (bibliotecas) => {
        this.lista = bibliotecas;
        this.listaFiltrada = [...bibliotecas];
      },
      error: (erro) => console.error(erro)
    });
  }

  pesquisar(): void {
    this.listaFiltrada = this.lista.filter(b =>
      !this.filtro.nome ||
      b.nome.toLowerCase().includes(this.filtro.nome.toLowerCase())
    );
  }

  limpar(): void {
    this.filtro = { nome: '' };
    this.listaFiltrada = [...this.lista];
  }
}