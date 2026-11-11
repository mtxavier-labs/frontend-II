const API_URL = "http://localhost:3000/api/profissionais";

// Lê a mensagem de erro enviada pela API (se existir) para mostrar ao usuário.
async function lerErro(resposta, mensagemPadrao) {
  try {
    const corpo = await resposta.json();
    return corpo.mensagem || corpo.erro || corpo.message || mensagemPadrao;
  } catch {
    return mensagemPadrao;
  }
}

// GET - Buscar todos os profissionais
export async function listarProfissionais() {
  const resposta = await fetch(API_URL);

  if (!resposta.ok) {
    throw new Error(await lerErro(resposta, "Erro ao buscar profissionais."));
  }

  return resposta.json();
}

// POST - Cadastrar um novo profissional
export async function cadastrarProfissional(dadosProfissional) {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dadosProfissional)
  });

  if (!resposta.ok) {
    throw new Error(await lerErro(resposta, "Erro ao cadastrar profissional."));
  }

  return resposta.json();
}

// PUT - Atualizar um profissional existente
export async function atualizarProfissional(id, dadosProfissional) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dadosProfissional)
  });

  if (!resposta.ok) {
    throw new Error(await lerErro(resposta, "Erro ao atualizar profissional."));
  }

  return resposta.json();
}

// DELETE - Excluir um profissional
export async function excluirProfissional(id) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!resposta.ok) {
    throw new Error(await lerErro(resposta, "Erro ao excluir profissional."));
  }
}
