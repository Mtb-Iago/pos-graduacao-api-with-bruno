const fs = require("fs").promises // Importa a versão com Promises

async function getTodosFavoritos() {
    const dados = await fs.readFile("favoritos.json", "utf-8")
    return dados ? JSON.parse(dados) : []
}

async function insereFavorito(livroNovo) {
    const favoritos = await getTodosFavoritos()
    
    // Opcional: validação extra para evitar o "flake" de id undefined
    if (!livroNovo || !livroNovo.id) {
        throw new Error("Dados do livro inválidos ou incompletos.")
    }

    
    const jaEFavorito = favoritos.find(livro => String(livro.id) === String(livroNovo.id))

    if (jaEFavorito) {
        throw new Error("Este livro já está nos seus favoritos.")
    }

    const novaLista = [...favoritos, livroNovo]
    await fs.writeFile("favoritos.json", JSON.stringify(novaLista, null, 2))
}

async function deletaFavorito(id) {
    const favoritos = await getTodosFavoritos()
    const novaLista = favoritos.filter(livro => String(livro.id) !== String(id))
    await fs.writeFile("favoritos.json", JSON.stringify(novaLista, null, 2))
}

module.exports = {
    getTodosFavoritos,
    insereFavorito,
    deletaFavorito
}