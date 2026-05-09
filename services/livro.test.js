const fs = require("fs");
const { 
    getTodosLivros, 
    getLivrosPorId, 
    insereLivro, 
    modificaLivro, 
    deleteLivro 
} = require("./livro");

// Mock do sistema de arquivos
jest.mock("fs");

describe("Serviços de Livros", () => {
    const mockLivros = [
        { id: "1", nome: "Livro A" },
        { id: "2", nome: "Livro B" }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        // Setup padrão: a maioria dos testes precisa ler o arquivo
        fs.readFileSync.mockReturnValue(JSON.stringify(mockLivros));
    });

    describe("getTodosLivros()", () => {
        it("Deve retornar a lista completa de livros do JSON", () => {
            const resultado = getTodosLivros();
            expect(resultado).toHaveLength(2);
            expect(resultado).toEqual(mockLivros);
        });

        it("Deve retornar uma lista vazia se o arquivo estiver corrompido ou inexistente", () => {
            fs.readFileSync.mockImplementation(() => { throw new Error(); });
            const resultado = getTodosLivros();
            expect(resultado).toEqual([]);
        });
    });

    describe("getLivrosPorId()", () => {
        it("Deve retornar o livro correto quando o ID existe", () => {
            const livro = getLivrosPorId("2");
            expect(livro).toEqual(mockLivros[1]);
        });

        it("Deve retornar null se o ID não for encontrado", () => {
            const livro = getLivrosPorId("999");
            expect(livro).toBeNull();
        });

        it("Deve lançar erro se o ID não for fornecido", () => {
            expect(() => getLivrosPorId()).toThrow("O ID é obrigatório para a busca.");
        });
    });

    describe("insereLivro()", () => {
        it("Deve salvar o livro com sucesso quando os dados são válidos", () => {
            const novoLivro = { id: "3", nome: "Livro C" };
            insereLivro(novoLivro);

            expect(fs.writeFileSync).toHaveBeenCalledWith(
                "livros.json",
                expect.stringContaining('"nome": "Livro C"')
            );
        });

        it("Deve lançar erro se o ID for nulo ou ausente", () => {
            const livroInvalido = { nome: "Sem ID" };
            expect(() => insereLivro(livroInvalido)).toThrow("Falha ao inserir: 'id' e 'nome' são obrigatórios.");
        });

        it("Deve lançar erro se o nome tiver menos de 3 caracteres", () => {
            const livroInvalido = { id: "4", nome: "No" };
            expect(() => insereLivro(livroInvalido)).toThrow("O nome do livro deve ser uma string com pelo menos 3 caracteres.");
        });

        it("Deve impedir a inserção de um ID que já existe", () => {
            const livroDuplicado = { id: "1", nome: "Clone" };
            expect(() => insereLivro(livroDuplicado)).toThrow("O livro com ID 1 já existe.");
        });
    });

    describe("modificaLivro()", () => {
        it("Deve alterar os dados de um livro existente", () => {
            const alteracao = { nome: "Livro A Alterado" };
            modificaLivro(alteracao, "1");

            expect(fs.writeFileSync).toHaveBeenCalledWith(
                "livros.json",
                expect.stringContaining("Livro A Alterado")
            );
        });

        it("Deve lançar erro se tentarem alterar o ID do livro", () => {
            const tentativaHack = { id: "999", nome: "Hack" };
            expect(() => modificaLivro(tentativaHack, "1")).toThrow("Não é permitido alterar o ID de um livro existente.");
        });

        it("Deve lançar erro se o payload de modificação for vazio", () => {
            expect(() => modificaLivro({}, "1")).toThrow("Nenhum dado foi enviado para modificação.");
        });

        it("Deve lançar erro se o livro para editar não existir", () => {
            expect(() => modificaLivro({ nome: "Novo" }, "404")).toThrow("Livro não encontrado para modificação.");
        });
    });

    describe("deleteLivro()", () => {
        it("Deve remover o livro da lista e atualizar o arquivo", () => {
            deleteLivro("1");

            // Verifica se o writeFileSync foi chamado sem o Livro A
            const chamadaAoGravar = JSON.parse(fs.writeFileSync.mock.calls[0][1]);
            expect(chamadaAoGravar).toHaveLength(1);
            expect(chamadaAoGravar[0].id).toBe("2");
        });

        it("Deve lançar erro ao tentar deletar um ID inexistente", () => {
            expect(() => deleteLivro("999")).toThrow("Livro não encontrado para exclusão.");
        });
    });
});