# Desenvolvimento Front-End II

Este repositório é destinado ao armazenamento das atividades, projetos e avaliações da disciplina de **Desenvolvimento Front-End II**.

## Integrantes do Grupo
* Fernando Tolentino de Souza Hessmann Dutra
* Jordana Gonçalves Góes
* Matheus Henrique Xavier 
* Lucas Ricci

## Estrutura do Repositório

Ao longo do semestre, este repositório abrigará o projeto contínuo da disciplina:

* **`/trampo-certo`**: Projeto PMI: Uma aplicação web em React que conecta profissionais autônomos/freelancers a estabelecimentos para trabalhos temporários.
* **`/Avaliações`**: Pasta contendo os documentos e relatórios de cada Sprint.

---

## Como instalar e rodar o projeto prático (Trampo Certo)

Para a avaliação das Sprints, siga os passos abaixo para executar a aplicação principal na sua máquina:

1. Clone este repositório:
   ```bash
   git clone git clone https://github.com/mtxavier-labs/frontend-II.git
   ```

2. Acesse a pasta do projeto React:
   ```bash
   cd trampo-certo
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. O terminal exibirá um link (geralmente `http://localhost:5173`). Clique ou copie-o para o seu navegador para visualizar o projeto.


---

## 🚀 Deploy na Vercel

- Na Vercel, importe este repositório com **Root Directory = `trampo-certo`** (framework Vite).
- Defina a variável de ambiente **`VITE_API_URL`** com a URL do Back-End publicado (ex.: `https://trampo-certo-api.vercel.app`, sem `/` no final).
- Localmente, sem essa variável, o Front-End usa `http://localhost:3000`.
- Passo a passo completo (incluindo MongoDB Atlas e CORS): [DEPLOY_VERCEL.md no repositório do Back-End](https://github.com/j0rdanaaa/trampo-certo-backend/blob/main/DEPLOY_VERCEL.md).
