import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Exemplar } from '../../models/exemplar';
import { SituacaoExemplar } from '../../models/situacao-exemplar';
import { ExemplarService } from '../../services/exemplar.service';

@Component({
  selector: 'app-exemplar-excluir',
  imports: [CommonModule],
  templateUrl: './exemplar-excluir.html',
  styleUrl: './exemplar-excluir.css',
})
export class ExemplarExcluir implements OnInit {
  exemplar: Exemplar = {
    tombo: '',
    situacao: SituacaoExemplar.DISPONIVEL,
    livroId: 0,
    bibliotecaId: 0
    
  };
  erro: string = '';

  constructor(
    private exemplarService: ExemplarService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.exemplarService.buscarPorId(id).subscribe({
      next: (exemplar) => {
        this.exemplar = exemplar;
        this.cdr.detectChanges();
      },
      error: (erro) => console.error(erro)
    });
  }

  excluir(): void {
    this.erro = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.exemplarService.excluir(id).subscribe({
      next: () => this.router.navigate(['/gerenciar/exemplares']),
      error: (erro) => this.erro = erro?.error?.message || 'Erro ao excluir exemplar.'
    });
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar/exemplares']);
  }
}