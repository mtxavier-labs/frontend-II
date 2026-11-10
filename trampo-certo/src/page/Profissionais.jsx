import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api/profissionais";

function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // FUNÇÃO PARA EXCLUIR PROFISSIONAL DO BANCO E DA TELA
  async function excluirProfissional(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este profissional?"
    );

    if (!confirmar) return;

    setErro("");

    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao excluir profissional.");
      }

      // Remove da tela imediatamente
      setProfissionais((anteriores) =>
        anteriores.filter((profissional) => profissional._id !== id)
      );

      alert("Profissional excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar profissional:", error);
      setErro("Não foi possível excluir o profissional.");
    }
  }

  useEffect(() => {
    const buscarProfissionais = async () => {
      try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
          throw new Error("Erro ao buscar profissionais.");
        }

        const dados = await resposta.json();

        setProfissionais(dados);
      } catch (erro) {
        console.error("Erro ao carregar profissionais:", erro);
        setErro(
          "Não foi possível carregar os profissionais. Verifique se a API está funcionando."
        );
      } finally {
        setCarregando(false);
      }
    };

    buscarProfissionais();
  }, []);

  return (
    <main className="page pagina-profissionais">
      <div className="profissionais-cabecalho">
        <h1>Encontre profissionais</h1>
        <p>
          Conheça talentos disponíveis para atuar
          em hotelaria, gastronomia e eventos.
        </p>
      </div>

      {carregando && (
        <p>Carregando profissionais...</p>
      )}

      {erro && (
        <p role="alert" className="cadastro-erro">{erro}</p>
      )}

      {!carregando && !erro && profissionais.length === 0 && (
        <p>Nenhum profissional cadastrado no momento.</p>
      )}

      {!carregando && !erro && (
        <div className="cards">
          {profissionais.map((profissional) => (
            <article
              className="card card-profissional"
              key={profissional._id}
            >
              <div className="profissional-avatar">
                {profissional.nome.charAt(0).toUpperCase()}
              </div>

              <h2>{profissional.nome}</h2>

              <p className="profissional-cargo">
                {profissional.profissao}
              </p>

              <p className="profissional-avaliacao">
                ⭐ {profissional.avaliacao || "Novo perfil"}
              </p>

              <p>
                <strong>Disponibilidade:</strong>{" "}
                {profissional.disponibilidade}
              </p>

              {/* BOTÕES DE AÇÃO DO CARD */}
              <div className="vaga-acoes" style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  onClick={() => setPerfilSelecionado(profissional)}
                >
                  Ver perfil
                </button>

                <button
                  className="botao-excluir"
                  onClick={() => excluirProfissional(profissional._id)}
                  style={{ backgroundColor: "#dc3545", color: "white" }}
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {perfilSelecionado && (
        <div
          className="modal-fundo"
          onClick={() => setPerfilSelecionado(null)}
        >
          <section
            className="modal-perfil"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-perfil"
            onClick={(evento) => evento.stopPropagation()}
          >
            <button
              type="button"
              className="modal-fechar"
              aria-label="Fechar perfil"
              onClick={() => setPerfilSelecionado(null)}
            >
              ×
            </button>

            <div className="profissional-avatar">
              {perfilSelecionado.nome.charAt(0).toUpperCase()}
            </div>

            <h2 id="titulo-perfil">
              {perfilSelecionado.nome}
            </h2>

            <p>
              <strong>Profissão:</strong>{" "}
              {perfilSelecionado.profissao}
            </p>

            <p>
              <strong>Cidade:</strong>{" "}
              {perfilSelecionado.cidade || "Não informada"}
            </p>

            <p>
              <strong>Avaliação:</strong>{" "}
              {perfilSelecionado.avaliacao
                ? `⭐ ${perfilSelecionado.avaliacao}`
                : "Ainda não avaliado"}
            </p>

            <p>
              <strong>Experiência:</strong>{" "}
              {perfilSelecionado.experiencia || "Não informada"}
            </p>

            <p>
              <strong>Disponibilidade:</strong>{" "}
              {perfilSelecionado.disponibilidade}
            </p>

            <button
              onClick={() => setPerfilSelecionado(null)}
            >
              Fechar perfil
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default Profissionais;
