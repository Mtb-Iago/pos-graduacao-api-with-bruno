const fs = require("fs")

//console.log(JSON.parse(fs.readFileSync("livros.json")))
const dadosAtuais = JSON.parse(fs.readFileSync("livros.json"))
const novoDado = { id: '3', nome: 'harry potter'}

fs.writeFileSync("livros.json", JSON.stringify([...dadosAtuais, novoDado]))

console.log(JSON.parse(fs.readFileSync("livros.json")))












// readFileSync
// writeFileSync