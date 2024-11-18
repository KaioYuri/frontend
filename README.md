# [Sistema de gerenciamento]() &middot; [![Autor Kaio](https://img.shields.io/badge/Autor-Kaio-%3C%3E)](https://kaioyuri.vercel.app)

Sistema gerênciamento construido com [shadcn/ui](https://ui.shadcn.com) completo com responsividade para ambientes mobile e android.

## Features

- Barra lateral retrátil, mini e larga
- Menu da barra lateral com rolagem
- Menu em estilo "sheet" para dispositivos móveis
- Menu agrupado com rótulos
- Submenu recolhível
- Lista de itens do menu extraída
- Formulário de registro de atividades, clientes e colaboradores.
- Tabela de pesquisa com filtro para atividades, clientes e colaboradores.


## Techs/frameworks usados

- Next.js 14
- Shadcn/ui
- Tailwind CSS
- TypeScript
- Zustand
- Zod

## Instalação

### Requisitos

Esta aplicação utiliza `docker` para sua execução, então se você tiver no windows, é necessário ter o `WSL` e o `docker desktop`.
Para usuários do linux basta apenas ter o `docker`.

No diretório a sua escolha você irá:

1. Clonar o repositório
   ```bash
   git clone https://github.com/kaioyuri/frontend
   ```

2. Abrir o repositório local:
   ```bash
   cd ./frontend/
   ```

3. Executar o Dockerfile
  ```bash
  docker build -t frontend-dev-app .
  docker run -p 3001:3000 nextjs-dev-app
  ```

4. Va para a URL `http://localhost:3000/` e a aplicação estará rodando
Obs: caso a página não esteja la , significa que tem um serviço rodando na porta 3000.
Então é só ir para a porta 3001 .
