# OpenAI Chat API

Este projeto define uma API construída com [NestJS](https://nestjs.com/), para gerenciar a comunicação com a [OpenAI](https://platform.openai.com/docs/introduction), incluindo integração com bancos de dados via [Mongoose](https://mongoosejs.com/) e serviços de busca via [SerpApi](https://serpapi.com/). Seu objetivo principal é fornecer endpoints que permitam a interação de serviços externos (como um frontend de chat) com a inteligência artificial da OpenAI e outras funcionalidades de busca.

## Visão Geral

A **OpenAI Chat API** foi desenvolvida com NestJS para proporcionar uma arquitetura modular e escalável. As principais responsabilidades da API incluem:

1. **Comunicação com a OpenAI**: Processar solicitações e respostas via SDK oficial da OpenAI.
2. **Integração com Banco de Dados**: Utilizar o [Mongoose](https://mongoosejs.com/) para persistir dados de conversas, histórico ou configurações.
3. **Consulta de Dados Externos**: Utilizar [SerpApi](https://serpapi.com/) para integrar funcionalidades adicionais de busca.
4. **Estrutura de Pastas Limpa**: Segue a convenção de módulos e providers do NestJS, facilitando a manutenção e ampliação do projeto.

## Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo para construção do lado servidor.
- **[OpenAI Node.js Library](https://www.npmjs.com/package/openai)** - Biblioteca oficial para acessar a API da OpenAI.
- **[Mongoose](https://mongoosejs.com/)** - Modelagem de dados para MongoDB em ambiente Node.js.
- **[SerpApi](https://serpapi.com/)** - Serviço para integração de buscas em mecanismos de pesquisa.
- **[TypeScript](https://www.typescriptlang.org/)** - Superset de JavaScript que adiciona tipagem estática.
- **[Jest](https://jestjs.io/)** - Framework de testes em JavaScript.
- **[ESLint](https://eslint.org/)** e **[Prettier](https://prettier.io/)** - Ferramentas para padronização e formatação de código.

## Pré-requisitos

Para executar esta API localmente, você precisará ter instalado:

- [Node.js](https://nodejs.org/en/) (versão recomendada: 18+)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) para gerenciamento de pacotes
- MongoDB instalado ou um serviço de banco de dados MongoDB em nuvem

## Instalação

Clone o repositório:
git clone https://github.com/seu-usuario/openai-chat-api.git

Entre na pasta do projeto:
cd openai-chat-api

Instale as dependências:
npm install
ou
yarn

Configure as variáveis de ambiente:
Crie um arquivo .env (ou use outro método de configuração) e defina as variáveis necessárias, por exemplo:

OPENAI_API_KEY=your_openai_api_key
SERPAPI_API_KEY=your_serpapi_key
MONGODB_URI=your_mongodb_connection_string

Ajuste conforme suas chaves e configuração de banco de dados.

---

## Scripts Disponíveis

No arquivo `package.json`, temos os seguintes scripts:

build: Gera a versão de produção (compilada) do projeto utilizando o Nest CLI.
npm run build

start: Inicializa a aplicação já compilada.
npm run start

start:dev: Executa a aplicação em modo de desenvolvimento, recarregando automaticamente a cada mudança de arquivo.
npm run start:dev

start:debug: Executa em modo de debug, ideal para uso com ferramentas de inspeção.
npm run start:debug

start:prod: Inicia a versão de produção (após o comando build).
npm run start:prod

lint: Executa o ESLint para encontrar e corrigir problemas no código.
npm run lint

test: Roda os testes unitários com o Jest.
npm run test

test:watch: Executa os testes em modo observador, refazendo-os ao detectar alterações.
npm run test:watch

test:cov: Gera um relatório de cobertura de testes.
npm run test:cov

test:e2e: Executa testes de ponta a ponta (e2e).
npm run test:e2e

format: Formata o código utilizando o Prettier.
npm run format
