const { Router } = require("express")
const { getFavoritos, postFavorito, deleteFavorito } = require("../controllers/favorito.js")

const router = Router()

// GET /favoritos - Lista todos os favoritos
router.get('/', getFavoritos)

// POST /favoritos/:id - Adiciona um livro específico aos favoritos
router.post('/:id', postFavorito)

// DELETE /favoritos/:id - Remove um livro dos favoritos
router.delete('/:id', deleteFavorito)

module.exports = router