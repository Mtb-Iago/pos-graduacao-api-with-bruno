const fs = require("fs");
const { getTodosFavoritos, insereFavorito, deletaFavorito } = require("./favorito");

jest.mock("fs");

describe("Serviços de Favoritos", () => {
    const mockFavoritos = [{ id: "1", nome: "Livro Favorito" }];

    beforeEach(() => {
        jest.clearAllMocks();
        fs.readFileSync.mockReturnValue(JSON.stringify(mockFavoritos));
    });

    describe("getTodosFavoritos()", () => {
        it("Deve retornar a lista de favoritos", () => {
            const resultado = getTodosFavoritos();
            expect(resultado).toHaveLength(1);
            expect(resultado[0].id).toBe("1");
        });
    });

    describe("insereFavorito()", () => {
        it("Deve adicionar um novo favorito com sucesso", () => {
            const novo = { id: "2", nome: "Novo Favorito" };
            insereFavorito(novo);
            expect(fs.writeFileSync).toHaveBeenCalled();
        });

        it("Deve lançar erro se o livro já for favorito", () => {
            const repetido = { id: "1", nome: "Livro Favorito" };
            expect(() => insereFavorito(repetido)).toThrow("Este livro já está nos seus favoritos.");
        });
    });

    describe("deletaFavorito()", () => {
        it("Deve remover um favorito existente", () => {
            deletaFavorito("1");
            expect(fs.writeFileSync).toHaveBeenCalledWith(
                "favoritos.json",
                expect.stringContaining("[]") // Lista deve ficar vazia
            );
        });

        it("Deve lançar erro se o ID não estiver nos favoritos", () => {
            expect(() => deletaFavorito("999")).toThrow("Livro não encontrado na lista de favoritos.");
        });
    });
});