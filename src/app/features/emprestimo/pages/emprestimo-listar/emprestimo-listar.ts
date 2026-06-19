import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Emprestimo } from '../../models/emprestimo';
import { EmprestimoService } from '../../services/emprestimo.service';

@Component({
  selector: 'app-emprestimo-listar',
  imports: [CommonModule],
  templateUrl: './emprestimo-listar.html',
  styleUrl: './emprestimo-listar.css',
})
export class EmprestimoListar implements OnInit {

  emprestimos: Emprestimo[] = [];

  constructor(
    private emprestimoeservice: EmprestimoService
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {

    this.emprestimoeservice
      .listar()
      .subscribe({
        next: (emprestimos) => {
          this.emprestimos = emprestimos;
        },
        error: (erro) => {
          console.error(erro);
        }
      });

  }

}