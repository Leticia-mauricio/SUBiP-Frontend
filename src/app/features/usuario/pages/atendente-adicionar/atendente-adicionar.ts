import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Pessoa } from '../../../pessoa/models/pessoa';
import { Usuario } from '../../models/usuario';
import { PessoaService } from '../../../pessoa/services/pessoa.service';
import { UsuarioService } from '../../services/usuario.service';
import { Perfil } from '../../../../models/perfil';

@Component({
  selector: 'app-atendente-adicionar',
  imports: [FormsModule, CommonModule],
  templateUrl: './atendente-adicionar.html',
  styleUrl: './atendente-adicionar.css'
})
export class AtendenteAdicionar implements OnInit {
  pessoa: Pessoa = { nome: '', cpf: '', email: '' };
  login: string = '';
  erro: string = '';

  constructor(
    private pessoaService: PessoaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  salvar(): void {
    this.erro = '';
    this.pessoaService.salvar(this.pessoa).pipe(
      switchMap((pessoaSalva) => {
        const usuario: Usuario = {
          login: this.login,
          perfil: Perfil.ATENDENTE,
          pessoaId: pessoaSalva.id!
        };
        return this.usuarioService.salvar(usuario);
      })
    ).subscribe({
      next: () => this.router.navigate(['/gerenciar/atendentes']),
      error: (erro) => {
        this.erro = erro?.error?.message || 'Erro ao cadastrar atendente.';
        this.cdr.detectChanges();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/atendentes']);
  }
}