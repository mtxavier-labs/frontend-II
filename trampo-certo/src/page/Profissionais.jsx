
import { useState, useEffect } from "react";

const profissionaisIniciais = [
  {
    id: 1,
    nome: "Ana Souza",
    profissao: "Garçonete",
    avaliacao: "4.9",
    experiencia: "3 anos",
    disponibilidade: "Finais de semana"
  },
  {
    id: 2,
    nome: "Carlos Mendes",
    profissao: "Cozinheiro",
    avaliacao: "4.8",
    experiencia: "5 anos",
    disponibilidade: "Durante a semana"
  },
  {
    id: 3,
    nome: "Mariana Lima",
    profissao: "Auxiliar de Eventos",
    avaliacao: "4.7",
    experiencia: "2 anos",
    disponibilidade: "Horários flexíveis"
  }
];

function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);

  useEffect(() => {
    try {
      const salvos = JSON.parse(
        localStorage.getItem("profissionais") || "[]"
      );

      setProfissionais([
        ...profissionaisIniciais,
        ...(Array.isArray(salvos) ? salvos : [])
      ]);
    } catch {
      setProfissionais(profissionaisIniciais);
    }
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

      <div className="cards">
        {profissionais.map((profissional) => (
          <article
            className="card card-profissional"
            key={profissional.id}
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

            <button
              onClick={() => setPerfilSelecionado(profissional)}
            >
              Ver perfil
            </button>
          </article>
        ))}
      </div>

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
