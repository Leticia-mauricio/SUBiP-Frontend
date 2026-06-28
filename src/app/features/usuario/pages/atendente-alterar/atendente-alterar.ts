import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Pessoa } from '../../../pessoa/models/pessoa';
import { Usuario } from '../../models/usuario';
import { PessoaService } from '../../../pessoa/services/pessoa.service';
import { UsuarioService } from '../../services/usuario.service';
import { Perfil } from '../../../../models/perfil';

@Component({
  selector: 'app-atendente-alterar',
  imports: [FormsModule, CommonModule],
  templateUrl: './atendente-alterar.html',
  styleUrl: './atendente-alterar.css'
})
export class AtendenteAlterar implements OnInit {
  pessoa: Pessoa = { nome: '', cpf: '', email: '' };
  usuario: Usuario = { login: '', perfil: Perfil.ATENDENTE, pessoaId: 0 };
  erro: string = '';

  constructor(
    private pessoaService: PessoaService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.buscarPorId(id).pipe(
      switchMap((usuario) => {
        this.usuario = usuario;
        return this.pessoaService.buscarPorId(usuario.pessoaId);
      })
    ).subscribe({
      next: (pessoa) => this.pessoa = pessoa,
      error: (erro) => console.error(erro)
    });
  }

  salvar(): void {
    this.erro = '';
    this.pessoaService.salvar(this.pessoa).pipe(
      switchMap(() => this.usuarioService.salvar(this.usuario))
    ).subscribe({
      next: () => this.router.navigate(['/gerenciar/atendentes']),
      error: (erro) => this.erro = erro?.error?.message || 'Erro ao alterar atendente.'
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/atendentes']);
  }
}