import { useState, useEffect } from "react";

const vagasIniciais = [
  {
    id: 1,
    cargo: "Garçom",
    empresa: "Hotel Floripa",
    valor: "R$ 180"
  },
  {
    id: 2,
    cargo: "Cozinheiro",
    empresa: "Restaurante Central",
    valor: "R$ 220"
  },
  {
    id: 3,
    cargo: "Auxiliar de Eventos",
    empresa: "Eventos Floripa",
    valor: "R$ 160"
  }
];

function Vagas() {
  const [vagas, setVagas] = useState(() => {
    try {
      const salvas = localStorage.getItem("vagas");

      if (salvas !== null) {
        const lista = JSON.parse(salvas);

        if (Array.isArray(lista)) {
          return lista;
        }
      }
    } catch {
      console.log("Erro ao carregar vagas.");
    }

    return vagasIniciais;
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargo, setCargo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [valor, setValor] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem("vagas", JSON.stringify(vagas));
  }, [vagas]);

  function limparFormulario() {
    setCargo("");
    setEmpresa("");
    setValor("");
    setIdEditando(null);
    setMostrarFormulario(false);
  }

  function salvarVaga(evento) {
    evento.preventDefault();

    if (idEditando !== null) {
      setVagas(
        vagas.map((vaga) =>
          vaga.id === idEditando
            ? { ...vaga, cargo, empresa, valor }
            : vaga
        )
      );
    } else {
      const novaVaga = {
        id: Date.now(),
        cargo,
        empresa,
        valor
      };

      setVagas([...vagas, novaVaga]);
    }

    limparFormulario();
  }

  function editarVaga(vaga) {
    setCargo(vaga.cargo);
    setEmpresa(vaga.empresa);
    setValor(vaga.valor);
    setIdEditando(vaga.id);
    setMostrarFormulario(true);
  }

  function excluirVaga(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta vaga?"
    );

    if (confirmar) {
      setVagas(vagas.filter((vaga) => vaga.id !== id));

      if (idEditando === id) {
        limparFormulario();
      }
    }
  }

  function publicarVaga() {
    setCargo("");
    setEmpresa("");
    setValor("");
    setIdEditando(null);
    setMostrarFormulario(true);
  }

  return (
    <main className="page pagina-vagas">
      <div className="vagas-cabecalho">
        <div>
          <h1>Encontre sua próxima oportunidade</h1>
          <p>
            Explore vagas em hotelaria, gastronomia
            e eventos.
          </p>
        </div>

        <button onClick={publicarVaga}>
          + Publicar vaga
        </button>
      </div>

      {mostrarFormulario && (
        <section className="secao-formulario">
          <h2>
            {idEditando !== null
              ? "Editar vaga"
              : "Publicar nova vaga"}
          </h2>

          <form onSubmit={salvarVaga}>
            <label htmlFor="cargo">Cargo</label>
            <input
              id="cargo"
              type="text"
              placeholder="Ex: Garçom"
              value={cargo}
              onChange={(evento) =>
                setCargo(evento.target.value)
              }
              required
            />

            <label htmlFor="empresa">Empresa</label>
            <input
              id="empresa"
              type="text"
              placeholder="Ex: Hotel Floripa"
              value={empresa}
              onChange={(evento) =>
                setEmpresa(evento.target.value)
              }
              required
            />

            <label htmlFor="valor">Valor por turno</label>
            <input
              id="valor"
              type="text"
              placeholder="Ex: R$ 180"
              value={valor}
              onChange={(evento) =>
                setValor(evento.target.value)
              }
              required
            />

            <div className="formulario-acoes">
              <button type="submit">
                {idEditando !== null
                  ? "Salvar alterações"
                  : "Cadastrar vaga"}
              </button>

              <button
                type="button"
                className="botao-cancelar"
                onClick={limparFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="secao-listagem">
        <h2>Vagas disponíveis ({vagas.length})</h2>

        {vagas.length === 0 ? (
          <p>
            Nenhuma vaga disponível no momento.
          </p>
        ) : (
          <div className="cards">
            {vagas.map((vaga) => (
              <article className="card card-vaga" key={vaga.id}>
                <span className="vaga-etiqueta">
                  Oportunidade
                </span>

                <h2>{vaga.cargo}</h2>

                <p className="vaga-empresa">
                  {vaga.empresa}
                </p>

                <p className="vaga-remuneracao">
                  {vaga.valor}
                </p>

                <div className="vaga-acoes">
                  <button
                    onClick={() =>
                      alert("Candidatura realizada!")
                    }
                  >
                    Candidatar-se
                  </button>

                  <button
                    className="botao-editar"
                    onClick={() => editarVaga(vaga)}
                  >
                    Editar
                  </button>

                  <button
                    className="botao-excluir"
                    onClick={() => excluirVaga(vaga.id)}
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Vagas;
