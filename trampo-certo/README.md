# 💼 Trampo Certo — Desenvolvimento Front-End II

Projeto acadêmico desenvolvido na disciplina de **Desenvolvimento Front-End II**, do curso de **Análise e Desenvolvimento de Sistemas da UNICESUSC**.

O **Trampo Certo** é uma plataforma web em desenvolvimento que busca conectar estabelecimentos dos setores de hotelaria, gastronomia e eventos a profissionais freelancers interessados em oportunidades de trabalho temporário.

O projeto também integra as atividades do **Projeto Multidisciplinar Integrador III (PMI III)**.

---

## 🎯 Objetivo

Desenvolver uma aplicação web moderna, funcional e intuitiva para facilitar a divulgação de vagas temporárias e a visualização de perfis profissionais.

A aplicação utiliza React no Front-end e se comunica com uma API REST desenvolvida em Node.js e Express, com persistência de dados no MongoDB Atlas.

---

## 🛠️ Tecnologias utilizadas

- JavaScript
- React.js
- Vite
- HTML5
- CSS3
- Node.js e Express (API integrada)
- MongoDB Atlas (persistência via Back-end)
- Git e GitHub
- Visual Studio Code

---

## ✅ Funcionalidades desenvolvidas

### 📋 Gestão de vagas

- [x] Visualização de vagas disponíveis
- [x] Cadastro de novas vagas
- [x] Edição de vagas existentes
- [x] Exclusão de vagas
- [x] Integração com API REST
- [x] Persistência das alterações no banco de dados
- [x] Mensagens de feedback e erro

### 👤 Profissionais

- [x] Cadastro de perfil profissional básico
- [x] Listagem de profissionais
- [x] Visualização de informações dos profissionais
- [x] Integração com a API de profissionais

### 🖥️ Interface

- [x] Navegação entre páginas
- [x] Componentização com React
- [x] Gerenciamento de estados
- [x] Formulários interativos
- [x] Consumo de API REST

---

## 📚 Evolução das Sprints

### Sprint 1 — N1: Estrutura inicial

Etapa dedicada à criação da estrutura do projeto React, organização das páginas e desenvolvimento inicial dos componentes.

**Principais objetivos:**
- Configuração do projeto React com Vite
- Criação da navegação
- Desenvolvimento inicial da interface
- Utilização de componentes, estados e eventos

O documento da N1 contém um registro retrospectivo, pois o relatório original não foi localizado.

### Sprint 2 — N2: CRUD local

Evolução da aplicação com operações de cadastro, listagem, edição e exclusão de informações.

**Principais objetivos:**
- Implementação de formulários
- Gerenciamento de dados com React
- Operações CRUD
- Persistência local com LocalStorage

### Sprint 3 — N3: Integração com API REST

Integração do Front-end com o Back-end do Trampo Certo.

**Funcionalidades trabalhadas:**
- Consumo de endpoints HTTP
- Listagem de vagas armazenadas no MongoDB
- Cadastro de vagas pela interface
- Atualização e exclusão de vagas
- Tratamento de erros nas requisições
- Atualização da interface após operações CRUD

A integração permite que as informações sejam armazenadas no banco de dados, substituindo a persistência exclusivamente local utilizada nas etapas anteriores para o gerenciamento de vagas.

---

## 📂 Estrutura do repositório

```text
frontend-II/
|
|-- Avaliações/
|   |-- N1/
|   |   |-- README.md
|   |-- N2/
|   |   |-- README.md
|   |-- N3/
|       |-- README.md
|
|-- trampo-certo/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- assets/
|   |
|   |-- package.json
|   |-- README.md
|
|-- README.md
```

A pasta `trampo-certo` contém a aplicação React, enquanto a pasta `Avaliações` reúne os registros e documentos referentes às Sprints.

---

## 🏗️ Arquitetura da aplicação

```text
        USUÁRIO
           |
           v
    FRONT-END REACT
       Vite + JSX
    localhost:5173
           |
           | Requisições HTTP / JSON
           v
      API REST
   Node.js + Express
    localhost:3000
           |
           v
        Mongoose
           |
           v
      MongoDB Atlas
```

### Integração com o Back-end

A aplicação realiza requisições HTTP para os endpoints disponibilizados pela API do Trampo Certo.

**Exemplos de endpoints:**

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/vagas` | Listar vagas |
| POST | `/api/vagas` | Cadastrar vaga |
| PUT | `/api/vagas/:id` | Atualizar vaga |
| DELETE | `/api/vagas/:id` | Excluir vaga |
| GET | `/api/profissionais` | Listar profissionais |
| POST | `/api/profissionais` | Cadastrar profissional |

---

## ▶️ Como executar o projeto

### Pré-requisitos

- Node.js instalado
- npm instalado
- Git instalado
- Back-end configurado para utilizar as funcionalidades integradas

### 1. Clonar o repositório

```bash
git clone https://github.com/mtxavier-labs/frontend-II.git
```

### 2. Acessar a pasta da aplicação

```bash
cd frontend-II/trampo-certo
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar o Front-end

```bash
npm run dev
```

O terminal exibirá o endereço local da aplicação, geralmente:

http://localhost:5173

### 5. Executar o Back-end

Em outro terminal, acesse o repositório do Back-end, configure as variáveis de ambiente e execute:

```bash
node server.js
```

A API deverá estar disponível em:

http://localhost:3000

**Importante:** para que as funcionalidades integradas funcionem corretamente, o Back-end precisa estar ativo e conectado ao MongoDB Atlas.

---

## 🎨 Protótipo no Figma

O Trampo Certo possui um protótipo de interface desenvolvido no Figma, contemplando os fluxos planejados para profissionais e estabelecimentos.

[Visualizar protótipo no Figma](https://www.figma.com/design/F7aKBHRfve0HyHCHWe4EWh/Untitled?node-id=0-1)

---

## 🧭 Funcionalidades planejadas

A plataforma continua em desenvolvimento.

Algumas funcionalidades previstas para versões futuras incluem:

- [ ] Login e autenticação completos
- [ ] Candidatura às vagas com persistência
- [ ] Seleção de candidatos pelos estabelecimentos
- [ ] Histórico de serviços
- [ ] Sistema de avaliações
- [ ] Pagamentos integrados
- [ ] Notificações
- [ ] Filtros avançados de oportunidades

Essas funcionalidades não devem ser confundidas com as entregas já implementadas.

---

## 🤝 Integrantes — Front-End II

- Fernando Tolentino de Souza Hessmann Dutra
- Jordana Gonçalves Góes
- Mateus Suman Carpenter
- Lucas Ricci

**Curso:** Análise e Desenvolvimento de Sistemas  
**Instituição:** UNICESUSC  
**Disciplina:** Desenvolvimento Front-End II  
**Ano:** 2026

---

## 🔗 Repositórios relacionados

- [Front-end — Trampo Certo](https://github.com/mtxavier-labs/frontend-II)
- [Back-end — Trampo Certo](https://github.com/j0rdanaaa/trampo-certo-backend)

---

**💼 Trampo Certo — Conectando oportunidades e profissionais.**
