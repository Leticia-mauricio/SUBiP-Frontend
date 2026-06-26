import { Routes } from '@angular/router';
import { Principal } from './components/principal/principal';
import { Gerenciar } from './components/gerenciar/gerenciar';
import { BibliotecaListar } from './features/biblioteca/pages/biblioteca-listar/biblioteca-listar';
import { BibliotecaAdicionar } from './features/biblioteca/pages/biblioteca-adicionar/biblioteca-adicionar';
import { BibliotecaExcluir } from './features/biblioteca/pages/biblioteca-excluir/biblioteca-excluir';
import { BibliotecaAlterar } from './features/biblioteca/pages/biblioteca-alterar/biblioteca-alterar';
import { LivroListar } from './features/livro/pages/livro-listar/livro-listar';
import { LivroAdicionar } from './features/livro/pages/livro-adicionar/livro-adicionar';
import { LivroExcluir } from './features/livro/pages/livro-excluir/livro-excluir';
import { LivroAlterar } from './features/livro/pages/livro-alterar/livro-alterar';
import { GeneroListar } from './features/genero/pages/genero-listar/genero-listar';
import { GeneroAdicionar } from './features/genero/pages/genero-adicionar/genero-adicionar';
import { GeneroExcluir } from './features/genero/pages/genero-excluir/genero-excluir';
import { GeneroAlterar } from './features/genero/pages/genero-alterar/genero-alterar';
import { ExemplarListar } from './features/exemplar/pages/exemplar-listar/exemplar-listar';
import { ExemplarAdicionar } from './features/exemplar/pages/exemplar-adicionar/exemplar-adicionar';
import { ExemplarExcluir } from './features/exemplar/pages/exemplar-excluir/exemplar-excluir';
import { ExemplarAlterar } from './features/exemplar/pages/exemplar-alterar/exemplar-alterar';
import { ReservaListar } from './features/reserva/pages/reserva-listar/reserva-listar';
import { ReservaAdicionar } from './features/reserva/pages/reserva-adicionar/reserva-adicionar';
import { ReservaCancelar} from './features/reserva/pages/reserva-cancelar/reserva-cancelar';
import { EmprestimoListar } from './features/emprestimo/pages/emprestimo-listar/emprestimo-listar';
import { EmprestimoAdicionar } from './features/emprestimo/pages/emprestimo-adicionar/emprestimo-adicionar';
import { EmprestimoDevolver } from './features/emprestimo/pages/emprestimo-devolver/emprestimo-devolver';
import { EmprestimoRenovar } from './features/emprestimo/pages/emprestimo-renovar/emprestimo-renovar';
import { PessoaListar } from './features/pessoa/pages/pessoa-listar/pessoa-listar';
import { PessoaAdicionar } from './features/pessoa/pages/pessoa-adicionar/pessoa-adicionar';
import { PessoaExcluir } from './features/pessoa/pages/pessoa-excluir/pessoa-excluir';
import { PessoaAlterar } from './features/pessoa/pages/pessoa-alterar/pessoa-alterar';
import { Home } from './features/home/home';
import { AcervoConsulta } from './features/acervo/pages/acervo-consulta/acervo-consulta';


export const routes: Routes = [
    {
        path: '',
        component: Principal,
        children: [
            { path: '', component: Home },
            { path: 'acervo', component: AcervoConsulta },
            {
                path: 'gerenciar',
                children: [
                    { path: '', component: Gerenciar },
                    {
                        path: 'bibliotecas',
                        children: [
                            { path: '', component: BibliotecaListar },
                            { path: 'adicionar', component: BibliotecaAdicionar },
                            { path: 'excluir/:id', component: BibliotecaExcluir },
                            { path: 'alterar/:id', component: BibliotecaAlterar }
                        ]
                    },
                    {
                        path: 'livros',
                        children: [
                            { path: '', component: LivroListar },
                            { path: 'adicionar', component: LivroAdicionar },
                            { path: 'excluir/:id', component: LivroExcluir },
                            { path: 'alterar/:id', component: LivroAlterar }
                        ]
                    },
                    {
                        path: 'generos',
                        children: [
                            { path: '', component: GeneroListar },
                            { path: 'adicionar', component: GeneroAdicionar },
                            { path: 'excluir/:id', component: GeneroExcluir },
                            { path: 'alterar/:id', component: GeneroAlterar }
                        ]
                    },
                    {
                        path: 'exemplares',
                        children: [
                            { path: '', component: ExemplarListar },
                            { path: 'adicionar', component: ExemplarAdicionar },
                            { path: 'excluir/:id', component: ExemplarExcluir },
                            { path: 'alterar/:id', component: ExemplarAlterar }
                        ]
                    },
                    {
                        path: 'pessoas',
                        children: [
                            { path: '', component: PessoaListar },
                            { path: 'adicionar', component: PessoaAdicionar },
                            { path: 'excluir/:id', component: PessoaExcluir },
                            { path: 'alterar/:id', component: PessoaAlterar }
                        ]
                    },
                    {
                        path: 'emprestimos',
                        children: [
                            { path: '', component: EmprestimoListar },
                            { path: 'adicionar', component: EmprestimoAdicionar },
                            { path: 'devolver', component: EmprestimoDevolver },
                            { path: 'renovar', component: EmprestimoRenovar }
                        ]
                    },
                    {
                        path: 'reservas',
                        children: [
                            { path: '', component: ReservaListar },
                            { path: 'adicionar', component: ReservaAdicionar },
                            { path: 'excluir/:id', component: ReservaCancelar }
                        ]
                    }
                ]
            }
        ]
    }
];
