const { getTodosFavoritos, insereFavorito, deletaFavorito } = require("../services/favorito")
const { getLivrosPorId } = require("../services/livro")

function getFavoritos(req, res) {
    try {
        const livros = getTodosFavoritos()
        res.send(livros)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function postFavorito(req, res) {
    try {
        const id = req.params.id
        const livro = await getLivrosPorId(id)
        
        if (!livro) {
            return res.status(404).send("Livro não encontrado no acervo principal.")
        }

        await insereFavorito(livro)
        res.status(201).send("Livro favoritado com sucesso!")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

function deleteFavorito(req, res) {
    try {
        const id = req.params.id
        
        if (!id) {
            return res.status(400).send("ID inválido")
        }

        deletaFavorito(id)
        res.send("Favorito removido com sucesso!")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getFavoritos,
    postFavorito,
    deleteFavorito
}