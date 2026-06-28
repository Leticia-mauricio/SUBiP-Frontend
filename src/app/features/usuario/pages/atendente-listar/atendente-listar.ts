import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-atendente-listar',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './atendente-listar.html',
  styleUrl: './atendente-listar.css'
})
export class AtendenteListar implements OnInit {
  lista: Usuario[] = [];
  listaFiltrada: Usuario[] = [];

  filtro = { nome: '', login: '' };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listar().subscribe({
      next: (usuarios) => {
        this.lista = usuarios.filter(u => u.perfil === 'ATENDENTE' as any);
        this.listaFiltrada = [...this.lista];
      },
      error: (erro) => console.error(erro)
    });
  }

  pesquisar(): void {
    this.listaFiltrada = this.lista.filter(u => {
      if (this.filtro.nome &&
        !u.pessoaNome!.toLowerCase().includes(this.filtro.nome.toLowerCase())) return false;
      if (this.filtro.login &&
        !u.login.toLowerCase().includes(this.filtro.login.toLowerCase())) return false;
      return true;
    });
  }

  limpar(): void {
    this.filtro = { nome: '', login: '' };
    this.listaFiltrada = [...this.lista];
  }
}