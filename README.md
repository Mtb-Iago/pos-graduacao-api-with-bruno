# 📚 Estudo de API Node.js 

Este projeto foi desenvolvido como parte de um estudo sobre criação de APIs utilizando **Node.js** e **Express**. O objetivo principal foi implementar um CRUD completo de livros e um sistema de favoritos, focando em boas práticas de validação, persistência em ficheiros JSON e testes automatizados.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução.
- **Express**: Framework para as rotas e middleware.
- **Bruno**: Ferramenta de testes de API (alternativa ao Postman/Insomnia).
- **FS Promises**: Manipulação assíncrona de ficheiros para evitar bloqueios.

## 🛠️ Funcionalidades

### Livros
- `GET /livros`: Lista todos os livros.
- `GET /livros/:id`: Procura um livro específico (com validação de ID).
- `POST /livros`: Adiciona um novo livro.
- `PATCH /livros/:id`: Edita informações de um livro.
- `DELETE /livros/:id`: Remove um livro do acervo.

### Favoritos
- `GET /favoritos`: Lista os livros favoritados.
- `POST /favoritos/:id`: Adiciona um livro existente aos favoritos.
- `DELETE /favoritos/:id`: Remove um livro dos favoritos.

## 🛡️ Validações e Robustez

Durante o desenvolvimento, foram aplicadas técnicas para garantir a estabilidade da API:
- **Tratamento de Race Conditions**: Implementação de `async/await` em todas as operações de I/O de ficheiros.
- **Sanitização de Inputs**: Validação de IDs utilizando `isNaN(Number(id))` para evitar erros 500 ao receber strings onde se esperam números.
- **Códigos de Status HTTP**: Uso correto de `200`, `201`, `400` (Bad Request) e `404` (Not Found).

## 🚦 Como Rodar os Testes

Este projeto utiliza o **Bruno CLI** para garantir que todas as rotas estão a funcionar corretamente.

1. Instala o Bruno CLI globalmente (opcional):
   ```bash
   npm install -g @usebruno/cli