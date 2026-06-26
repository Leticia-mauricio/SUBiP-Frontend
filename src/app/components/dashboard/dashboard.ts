import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ItemMenu } from '../../models/item-menu';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Autenticacao } from '../../models/autenticacao';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  autenticacao: Autenticacao | null = null;

  constructor(
    private autenticacaoService: AutenticacaoService
  ) {
    this.autenticacao =
      this.autenticacaoService.getAutenticacao();
  }

  menus: ItemMenu[] = [

    {
      descricao: 'Consultar Acervo',
      rota: '/acervo',
      icone: '📚'
    },

    {
      descricao: 'Registrar Empréstimo',
      rota: '/gerenciar/emprestimos/adicionar',
      icone: '📖',
      perfis: ['ATENDENTE']
    },

    {
      descricao: 'Registrar Devolução',
      rota: '/gerenciar/emprestimos/devolver',
      icone: '↩️',
      perfis: ['ATENDENTE']
    },

    {
      descricao: 'Renovar Empréstimo',
      rota: '/gerenciar/emprestimos/renovar',
      icone: '📖',
      perfis: ['ATENDENTE']
    },

    {
      descricao: 'Consultar Empréstimos',
      rota: '/gerenciar/emprestimos',
      icone: '📖',
      perfis: ['ATENDENTE']
    },

    {
      descricao: 'Meus Empréstimos',
      rota: '/gerenciar/emprestimos/meus-emprestimos',
      icone: '📖',
      perfis: ['LEITOR']
    },

    {
      descricao: 'Gerenciar Livros',
      rota: '/gerenciar/livros',
      icone: '📘',
      perfis: ['ATENDENTE', 'ADMIN']
    },

    {
      descricao: 'Gerenciar Exemplares',
      rota: '/gerenciar/exemplares',
      icone: '🏷️',
      perfis: ['ATENDENTE', 'ADMIN']
    },

    {
      descricao: 'Gerenciar Leitores',
      rota: '/gerenciar/pessoas',
      icone: '👥',
      perfis: ['ATENDENTE', 'ADMIN']
    },

    {
      descricao: 'Gerenciar Bibliotecas',
      rota: '/gerenciar/bibliotecas',
      icone: '🏛️',
      perfis: ['ADMIN']
    }

  ];

  menusPermitidos(): ItemMenu[] {

    return this.menus.filter(menu => {

      if (!menu.perfis || menu.perfis.length === 0) {
        return true;
      }

      if (!this.autenticacao) {
        return false;
      }

      return menu.perfis.includes(this.autenticacao.perfil);

    });

  }

}