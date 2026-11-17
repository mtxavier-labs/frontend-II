
# Trampo Certo — Desenvolvimento Front-End II

Projeto acadêmico desenvolvido para a disciplina de
Desenvolvimento Front-End II, utilizando React, Vite
e integração com API RESTful.

## Sobre o projeto

O Trampo Certo é uma plataforma que conecta
profissionais freelancers a estabelecimentos
dos setores de hotelaria, gastronomia e eventos.

Na Sprint 3 (N3), o foco foi integrar o Front-End
ao Back-End, substituindo a persistência local
pela comunicação com uma API RESTful.

## Integrantes do grupo

- Fernando Tolentino de Souza Hessmann Dutra
- Jordana Gonçalves Góes
- Mateus Suman Carpenter
- Lucas Ricci

## Tecnologias utilizadas

### Front-End
- React
- Vite
- JavaScript
- HTML
- CSS
- Fetch API

### Back-End
- Node.js
- Express
- MongoDB
- Mongoose

## Estrutura do repositório

- `trampo-certo/`: aplicação React
- `Avaliações/`: documentos e relatórios das Sprints

Dentro de `trampo-certo/src`:

- `components/`: componentes reutilizáveis
- `page/`: páginas da aplicação
- `services/`: comunicação com a API RESTful
- `assets/`: imagens e recursos visuais

## Funcionalidades da Sprint 3

### CRUD de vagas

- CREATE: cadastrar novas vagas
- READ: listar vagas disponíveis
- UPDATE: editar vagas existentes
- DELETE: excluir vagas cadastradas

As operações utilizam a API RESTful do Back-End.

### Tratamento de erros

O sistema apresenta mensagens quando a API
está indisponível ou uma operação falha.

### Outras funcionalidades

- Navegação entre páginas
- Visualização de profissionais
- Formulários de cadastro
- Interface responsiva conforme os estilos implementados

## Como executar o projeto

### Pré-requisitos

- Node.js e npm instalados
- Back-End configurado e funcionando
- Acesso ao banco MongoDB

### 1. Clonar o Front-End

```bash
git clone https://github.com/mtxavier-labs/frontend-II.git
cd frontend-II/trampo-certo
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o Back-End

O Back-End está disponível em:

https://github.com/j0rdanaaa/trampo-certo-backend

Clone o repositório separadamente, instale
as dependências e configure o arquivo `.env`
com as variáveis necessárias para o MongoDB.

Inicie a API com:

```bash
npm start
```

A API deve estar disponível em:

http://localhost:3000

### 4. Iniciar o Front-End

No terminal da pasta `trampo-certo`:

```bash
npm run dev
```

Abra o endereço exibido pelo Vite,
geralmente:

http://localhost:5173

## Integração com a API

O arquivo `src/services/vagasService.js`
centraliza as requisições HTTP:

| Operação | Método | Endpoint |
|---|---|---|
| Listar vagas | GET | /api/vagas |
| Cadastrar vaga | POST | /api/vagas |
| Atualizar vaga | PUT | /api/vagas/:id |
| Excluir vaga | DELETE | /api/vagas/:id |

A URL base utilizada no desenvolvimento é:

http://localhost:3000/api/vagas

## Observações

- O Back-End precisa estar ativo para consultar
  e modificar as vagas.
- A persistência das vagas é realizada no MongoDB.
- O botão de candidatura é demonstrativo e
  ainda não registra candidaturas na API.

## Disciplina

Desenvolvimento Front-End II

Professor: Saulo

Entrega: Sprint 3 — N3

Data da apresentação: 17/11/2026
