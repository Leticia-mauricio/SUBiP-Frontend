import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EmprestimoService } from '../../services/emprestimo.service';
import { BibliotecaService } from '../../../biblioteca/services/biblioteca.service';
import { Biblioteca } from '../../../biblioteca/models/biblioteca';
import { SituacaoEmprestimo } from '../../models/situacao-emprestimo';
import { PessoaService } from '../../../pessoa/services/pessoa.service';

@Component({
  selector: 'app-emprestimo-listar',
  imports: [CommonModule, FormsModule],
  templateUrl: './emprestimo-listar.html',
  styleUrls: ['./emprestimo-listar.css']
})
export class EmprestimoListar implements OnInit {
  lista: any[] = [];
  listaFiltrada: any[] = [];
  bibliotecas: Biblioteca[] = [];
  situacoes = Object.values(SituacaoEmprestimo);

  filtro = { tombo: '', titulo: '', pessoa: '', cpf: '', situacao: '', bibliotecaId: null as number | null };

  constructor(
    private emprestimoService: EmprestimoService,
    private bibliotecaService: BibliotecaService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    forkJoin({
      emprestimos: this.emprestimoService.listar(),
      pessoas: this.pessoaService.listar(),
      bibliotecas: this.bibliotecaService.listar()
    }).subscribe(({ emprestimos, pessoas, bibliotecas }) => {
      this.bibliotecas = bibliotecas;
      this.lista = emprestimos.map(emp => {
        const pessoa = pessoas.find(p => p.id === emp.pessoaId);
        return {
          ...emp,
          pessoaCpf: pessoa?.cpf ?? ''
        };
      });
      this.listaFiltrada = [...this.lista]; 
    });
  }

  pesquisar(): void {
    this.listaFiltrada = this.lista.filter(e => {
      if (this.filtro.tombo &&
        !e.tombo.toLowerCase().includes(this.filtro.tombo.toLowerCase())) return false;
      if (this.filtro.titulo &&
        !e.tituloLivro.toLowerCase().includes(this.filtro.titulo.toLowerCase())) return false;
      if (this.filtro.pessoa &&
        !e.pessoaNome.toLowerCase().includes(this.filtro.pessoa.toLowerCase())) return false;
      if (this.filtro.cpf &&
        !e.pessoaCpf?.toLowerCase().includes(this.filtro.cpf.toLowerCase())) return false;
      if (this.filtro.situacao && e.situacao !== this.filtro.situacao) return false;
      if (this.filtro.bibliotecaId && e.bibliotecaId !== this.filtro.bibliotecaId) return false;
      return true;
    });
  }

  limpar(): void {
    this.filtro = { tombo: '', titulo: '', pessoa: '', cpf: '', situacao: '', bibliotecaId: null };
    this.listaFiltrada = [...this.lista];
  }
}