const livroService = require("../services/livro")

function getLivros(req, res) {
    try {
        const livros = livroService.getTodosLivros()
        res.send(livros)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

function getLivro(req, res) {
    try {
        const id = req.params.id
        if (isNaN(Number(id))) {
            return res.status(400).send("ID inválido. Deve ser um número.");
        }
        
        const livro = livroService.getLivrosPorId(id)
        if (!livro) {
            return res.status(404)
        }

        return res.send(livro)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

function postLivro(req, res) {
    try {
        const livroNovo = req.body
        livroService.insereLivro(livroNovo)
        res.status(201)
        res.send("Livro inserido com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

function patchLivro(req, res) {
    try {
        const id = req.params.id
        const body = req.body
        livroService.modificaLivro(body, id)
        res.send("Item atualizado com sucesso!")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

function deleteLivro(req, res) {
    try {
        const id = req.params.id
        livroService.deleteLivro(id)
        res.send("Item deletado com sucesso!")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getLivros,
    getLivro,
    postLivro,
    patchLivro,
    deleteLivro
}




/* const fs = require("fs")

function getLivros(req, res){
    try {
        const livros = JSON.parse(fs.readFileSync("livros.json"))
        res.send(livros)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getLivros
}
*/