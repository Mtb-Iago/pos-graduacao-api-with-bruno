const fs = require("fs");
const FILE_PATH = "livros.json";

function getTodosLivros() {
    try {
        const conteudo = fs.readFileSync(FILE_PATH, "utf-8");
        return JSON.parse(conteudo) || [];
    } catch (error) {
        return [];
    }
}

function getLivrosPorId(id) {
    // Validação de entrada
    if (!id) throw new Error("O ID é obrigatório para a busca.");
    
    const livros = getTodosLivros();
    return livros.find(livro => String(livro.id) === String(id)) || null;
}

function insereLivro(livroNovo) {
    // VALIDAÇÃO: Campos obrigatórios
    if (!livroNovo.id || !livroNovo.nome) {
        throw new Error("Falha ao inserir: 'id' e 'nome' são obrigatórios.");
    }

    // VALIDAÇÃO: Tipo de dado e conteúdo mínimo
    if (typeof livroNovo.nome !== "string" || livroNovo.nome.trim().length < 3) {
        throw new Error("O nome do livro deve ser uma string com pelo menos 3 caracteres.");
    }

    const livros = getTodosLivros();

    // VALIDAÇÃO: Duplicidade de ID (Prevenção de conflito)
    const idJaExiste = livros.find(livro => String(livro.id) === String(livroNovo.id));
    if (idJaExiste) {
        throw new Error(`O livro com ID ${livroNovo.id} já existe.`);
    }

    const novaListaDeLivros = [...livros, { ...livroNovo, nome: livroNovo.nome.trim() }];
    fs.writeFileSync(FILE_PATH, JSON.stringify(novaListaDeLivros, null, 2));
}

function modificaLivro(modificadores, id) {
    // VALIDAÇÃO: Impede envio de objeto vazio
    if (!modificadores || Object.keys(modificadores).length === 0) {
        throw new Error("Nenhum dado foi enviado para modificação.");
    }

    let livrosAtuais = getTodosLivros();
    const indiceModificado = livrosAtuais.findIndex(livro => String(livro.id) === String(id));

    // VALIDAÇÃO: Existência do recurso
    if (indiceModificado === -1) {
        throw new Error("Livro não encontrado para modificação.");
    }

    // VALIDAÇÃO: Impede a troca acidental de ID via modificadores
    if (modificadores.id && String(modificadores.id) !== String(id)) {
        throw new Error("Não é permitido alterar o ID de um livro existente.");
    }

    livrosAtuais[indiceModificado] = { ...livrosAtuais[indiceModificado], ...modificadores };
    fs.writeFileSync(FILE_PATH, JSON.stringify(livrosAtuais, null, 2));
}

function deleteLivro(id) {
    const livrosAtuais = getTodosLivros();
    const livrosFiltrados = livrosAtuais.filter(livro => String(livro.id) !== String(id));

    // VALIDAÇÃO: Se o tamanho for igual, nada foi removido (ID não existia)
    if (livrosAtuais.length === livrosFiltrados.length) {
        throw new Error("Livro não encontrado para exclusão.");
    }

    fs.writeFileSync(FILE_PATH, JSON.stringify(livrosFiltrados, null, 2));
}

module.exports = {
    getTodosLivros,
    getLivrosPorId,
    insereLivro,
    modificaLivro,
    deleteLivro
};