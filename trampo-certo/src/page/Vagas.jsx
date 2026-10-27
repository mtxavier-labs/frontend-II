import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api/vagas";

function Vagas() {
  const [vagas, setVagas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargo, setCargo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [valor, setValor] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    async function carregarVagas() {
      try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
          throw new Error("Erro ao buscar vagas.");
        }

        const dados = await resposta.json();
        setVagas(dados);
      } catch {
        setErro("Não foi possível carregar as vagas. Verifique se a API está funcionando.");
      } finally {
        setCarregando(false);
      }
    }

    carregarVagas();
  }, []);

  function limparFormulario() {
    setCargo("");
    setEmpresa("");
    setValor("");
    setIdEditando(null);
    setMostrarFormulario(false);
  }

  async function salvarVaga(evento) {
    evento.preventDefault();
    setErro("");

    const valorNumerico = Number(valor);

    if (
      !cargo.trim() ||
      !empresa.trim() ||
      !valor.trim() ||
      !Number.isFinite(valorNumerico) ||
      valorNumerico < 0
    ) {
      setErro("Preencha os campos corretamente. O valor deve ser um número válido.");
      return;
    }

    const dadosVaga = {
      cargo: cargo.trim(),
      empresa: empresa.trim(),
      valor: valorNumerico
    };

    const editando = idEditando !== null;
    const endereco = editando
      ? `${API_URL}/${idEditando}`
      : API_URL;

    setSalvando(true);

    try {
      const resposta = await fetch(endereco, {
        method: editando ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosVaga)
      });

      if (!resposta.ok) {
        throw new Error("Erro ao salvar vaga.");
      }

      const resultado = await resposta.json();

      // O PUT devolve { mensagem, vaga }.
      // O POST devolve diretamente a vaga.
      const vagaSalva = editando ? resultado.vaga : resultado;

      if (editando) {
        setVagas((anteriores) =>
          anteriores.map((vaga) =>
            vaga._id === idEditando ? vagaSalva : vaga
          )
        );
      } else {
        setVagas((anteriores) => [...anteriores, vagaSalva]);
      }

      limparFormulario();
    } catch {
      setErro("Não foi possível salvar a vaga. Verifique a conexão com a API.");
    } finally {
      setSalvando(false);
    }
  }

  function editarVaga(vaga) {
    setErro("");
    setCargo(vaga.cargo);
    setEmpresa(vaga.empresa);
    setValor(String(vaga.valor));
    setIdEditando(vaga._id);
    setMostrarFormulario(true);
  }

  async function excluirVaga(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta vaga?"
    );

    if (!confirmar) return;

    setErro("");

    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!resposta.ok) {
        throw new Error("Erro ao excluir vaga.");
      }

      setVagas((anteriores) =>
        anteriores.filter((vaga) => vaga._id !== id)
      );

      if (idEditando === id) {
        limparFormulario();
      }
    } catch {
      setErro("Não foi possível excluir a vaga.");
    }
  }

  function publicarVaga() {
    setErro("");
    setCargo("");
    setEmpresa("");
    setValor("");
    setIdEditando(null);
    setMostrarFormulario(true);
  }

  function formatarValor(valorVaga) {
    return Number(valorVaga).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
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

      {erro && (
        <p role="alert" className="cadastro-erro">
          {erro}
        </p>
      )}

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

            <label htmlFor="valor">Valor por turno (R$)</label>
            <input
              id="valor"
              type="number"
              min="0"
              step="0.01"
              placeholder="Ex: 180"
              value={valor}
              onChange={(evento) =>
                setValor(evento.target.value)
              }
              required
            />

            <div className="formulario-acoes">
              <button type="submit" disabled={salvando}>
                {salvando
                  ? "Salvando..."
                  : idEditando !== null
                    ? "Salvar alterações"
                    : "Cadastrar vaga"}
              </button>

              <button
                type="button"
                className="botao-cancelar"
                onClick={limparFormulario}
                disabled={salvando}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="secao-listagem">
        <h2>Vagas disponíveis ({vagas.length})</h2>

        {carregando ? (
          <p>Carregando vagas...</p>
        ) : vagas.length === 0 ? (
          <p>Nenhuma vaga disponível no momento.</p>
        ) : (
          <div className="cards">
            {vagas.map((vaga) => (
              <article
                className="card card-vaga"
                key={vaga._id}
              >
                <span className="vaga-etiqueta">
                  Oportunidade
                </span>

                <h2>{vaga.cargo}</h2>

                <p className="vaga-empresa">
                  {vaga.empresa}
                </p>

                <p className="vaga-remuneracao">
                  {formatarValor(vaga.valor)}
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
                    onClick={() => excluirVaga(vaga._id)}
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
