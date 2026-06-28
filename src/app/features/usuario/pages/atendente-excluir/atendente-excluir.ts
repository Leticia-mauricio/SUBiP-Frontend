import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Perfil } from '../../../../models/perfil';

@Component({
  selector: 'app-atendente-excluir',
  imports: [CommonModule],
  templateUrl: './atendente-excluir.html',
  styleUrl: './atendente-excluir.css'
})
export class AtendenteExcluir implements OnInit {
  usuario: Usuario = { login: '', perfil: Perfil.ATENDENTE, pessoaId: 0 };
  erro: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.buscarPorId(id).subscribe({
      next: (usuario) => this.usuario = usuario,
      error: (erro) => console.error(erro)
    });
  }

  excluir(): void {
    this.erro = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.usuarioService.excluir(id).subscribe({
      next: () => this.router.navigate(['/gerenciar/atendentes']),
      error: (erro) => this.erro = erro?.error?.message || 'Erro ao excluir atendente.'
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/atendentes']);
  }
}