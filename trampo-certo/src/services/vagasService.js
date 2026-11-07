
const API_URL = "http://localhost:3000/api/vagas";

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
