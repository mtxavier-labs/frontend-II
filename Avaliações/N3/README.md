Sprint 3 (N3) — Sistema Integrado
Data da apresentação: 17/11/2026
Repositório: https://github.com/mtxavier-labs/frontend-II
Objetivo
Integrar o React a uma API RESTful, substituir o armazenamento local das vagas por operações no back-end e exibir mensagens quando a API falhar.
Funcionalidades verificadas em 17/11/2026
- Front-end React/Vite iniciado e exibido no navegador.
- Back-end Express iniciado na porta 3000 e conexão MongoDB confirmada no terminal.
- CRUD de vagas testado na interface: cadastrar, listar, editar e excluir.
- Teste de indisponibilidade: com o back-end desligado, a página mostrou mensagem de falha da API.
- Página de profissionais abriu e exibiu conteúdo; CRUD de profissionais não foi validado integralmente nesta revisão.
Organização do código
- trampo-certo/src/page/Vagas.jsx: interface, formulário, estados, listagem e mensagens.
- trampo-certo/src/services/vagasService.js: chamadas GET, POST, PUT e DELETE para /api/vagas.
- trampo-certo/src/components: componentes compartilhados, incluindo Navbar e Card (uso efetivo do Card não verificado).
Atualização técnica de 17/11
As requisições PUT e DELETE, antes implementadas em Vagas.jsx, foram movidas para vagasService.js. O CRUD foi novamente testado após a refatoração. Commit publicado na main: af817be.
Limites e verificações pendentes
- O botão Candidatar-se exibe apenas um alerta; não registra candidatura na API.
- Conferir o fluxo completo de profissionais e cadastro antes de declarar integração integral.
- Confirmar commits individuais, erros no console e envio do ZIP oficial até as 22h.
- O relatório PDF anterior registra situação até 10/11; atualizar as descrições da separação de serviços e dos testes de 17/11 antes da entrega final.
Fonte
Relatório Final da Sprint 3, fornecido pela equipe (7 páginas), complementado pelos testes realizados em 17/11.