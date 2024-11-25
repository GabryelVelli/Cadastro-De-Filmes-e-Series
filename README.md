# Cadastro de Filmes e Séries com Knockout.js

Este projeto permite o cadastro de filmes e séries com a funcionalidade de filtrar, salvar e exibir os dados na interface. Ele utiliza a biblioteca **Knockout.js** para a binding de dados e **localStorage** para persistir as informações no navegador.

## Funcionalidades

- **Cadastro de Filmes e Séries**: O usuário pode cadastrar filmes e séries com os seguintes dados:
  - Nome
  - Ano
  - Gênero
  - Avaliação
  - Número de Temporadas (apenas para séries)

- **Exibição de Itens Cadastrados**: Os filmes e séries cadastrados são exibidos em uma lista. O usuário pode filtrar os itens entre:
  - Todos
  - Filmes
  - Séries

- **Persistência de Dados**: Todos os itens cadastrados são salvos no `localStorage` do navegador, permitindo que os dados persistam mesmo após o fechamento do navegador.

- **Remoção de Itens**: O usuário pode excluir filmes ou séries da lista com uma confirmação.

## Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Knockout.js e JQuery)**
- **localStorage**
