export interface AcervoAgrupado {
    livroId: number;
    titulo: string;
    isbn: string;
    generoId: number;
    generoDescricao: string;
    bibliotecaId: number;
    bibliotecaNome: string;
    quantidadeDisponivel: number;
    quantidadeEmprestada: number;
}
