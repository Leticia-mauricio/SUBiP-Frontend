import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ReservaService } from '../../services/reserva.service';
import { ExemplarService } from '../../../exemplar/services/exemplar.service';
import { PessoaService } from '../../../pessoa/services/pessoa.service';
import { Reserva } from '../../models/reserva';
import { SituacaoReserva } from '../../models/situacao-reserva';
import { Pessoa } from '../../../pessoa/models/pessoa';

@Component({
  selector: 'app-reserva-adicionar',
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-adicionar.html',
  styleUrl: './reserva-adicionar.css'
})
export class ReservaAdicionar implements OnInit {
  // dados carregados
  exemplares: any[] = [];
  pessoas: Pessoa[] = [];

  // filtros de busca
  filtroPessoa = { nome: '', cpf: '' };
  filtroTombo = '';

  // resultados filtrados
  exemplaresFiltrados: any[] = [];
  pessoasFiltradas: Pessoa[] = [];

  // selecionados
  exemplarSelecionado: any = null;
  pessoaSelecionada: Pessoa | null = null;

  erro: string = '';

  constructor(
    private reservaService: ReservaService,
    private exemplarService: ExemplarService,
    private pessoaService: PessoaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    forkJoin({
      exemplares: this.exemplarService.listar(),
      pessoas: this.pessoaService.listar()
    }).subscribe({
      next: ({ exemplares, pessoas }) => {
        this.exemplares = exemplares.filter(
          e => e.situacao === 'EMPRESTADO'
        );
        this.pessoas = pessoas;
      },
      error: (erro) => console.error(erro)
    });
  }

  buscarExemplar(): void {
    this.exemplarSelecionado = null;
    this.exemplaresFiltrados = this.exemplares.filter(e =>
      e.tombo.toLowerCase().includes(this.filtroTombo.toLowerCase())
    );
  }

  buscarPessoa(): void {
    this.pessoaSelecionada = null;
    this.pessoasFiltradas = this.pessoas.filter(p => {
      const nomeOk = this.filtroPessoa.nome &&
        p.nome.toLowerCase().includes(this.filtroPessoa.nome.toLowerCase());
      const cpfOk = this.filtroPessoa.cpf &&
        p.cpf.toLowerCase().includes(this.filtroPessoa.cpf.toLowerCase());
      return nomeOk || cpfOk;
    });
  }

  selecionarExemplar(exemplar: any): void {
    this.exemplarSelecionado = exemplar;
    this.exemplaresFiltrados = [];
    this.filtroTombo = exemplar.tombo;
  }

  selecionarPessoa(pessoa: Pessoa): void {
    this.pessoaSelecionada = pessoa;
    this.pessoasFiltradas = [];
    this.filtroPessoa = { nome: pessoa.nome, cpf: '' };
  }

  salvar(): void {
    this.erro = '';
    if (!this.exemplarSelecionado || !this.pessoaSelecionada) {
      this.erro = 'Selecione um exemplar e um leitor para continuar.';
      return;
    }

    const reserva: Reserva = {
      situacao: SituacaoReserva.ATIVA,
      dataRegistro: '',
      exemplarId: this.exemplarSelecionado.id,
      pessoaId: this.pessoaSelecionada.id!
    };

    this.reservaService.salvar(reserva).subscribe({
      next: () => this.router.navigate(['/gerenciar/reservas']),
      error: (erro) => this.erro = erro?.error?.message || 'Erro ao registrar reserva.'
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/reservas']);
  }
}