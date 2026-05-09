const { getLivros, getLivro, postLivro, patchLivro, deleteLivro} = require("../controllers/livro.js")
const { Router } = require("express")

const router = Router()

router.get('/', getLivros)
router.get('/:id', getLivro)

/* router.post('/', (req, res) => {
    res.send("POST - Hello world")
}) */

router.post('/', postLivro)

// PATCH por ID
router.patch('/:id', patchLivro)


router.delete('/:id', deleteLivro)

module.exports = router