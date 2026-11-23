import { API_BASE_URL } from "./api.js";

const API_URL = `${API_BASE_URL}/api/vagas`;

// GET - Buscar todas as vagas
export async function listarVagas() {
  const resposta = await fetch(API_URL);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar vagas.");
  }

  return resposta.json();
}

// POST - Cadastrar uma nova vaga
export async function cadastrarVaga(dadosVaga) {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dadosVaga)
  });

  if (!resposta.ok) {
    throw new Error("Erro ao cadastrar vaga.");
  }

  return resposta.json();
}

// PUT - Atualizar uma vaga existente
export async function atualizarVaga(id, dadosVaga) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dadosVaga)
  });

  if (!resposta.ok) {
    throw new Error("Erro ao atualizar vaga.");
  }

  const resultado = await resposta.json();

  // O back-end retorna { mensagem, vaga }
  return resultado.vaga;
}

// DELETE - Excluir uma vaga
export async function excluirVaga(id) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!resposta.ok) {
    throw new Error("Erro ao excluir vaga.");
  }

  return true;
}
