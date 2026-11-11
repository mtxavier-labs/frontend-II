import { useState, useEffect } from "react";
import {
  listarProfissionais,
  atualizarProfissional,
  excluirProfissional
} from "../services/profissionaisService.js";

const PROFISSOES = [
  "Garçom/Garçonete",
  "Cozinheiro",
  "Bartender",
  "Auxiliar de Eventos",
  "Recepcionista"
];

const DISPONIBILIDADES = [
  "Durante a semana",
  "Finais de semana",
  "Horários flexíveis"
];

function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroCarregamento, setErroCarregamento] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Estado do formulário de edição
  const [idEditando, setIdEditando] = useState(null);
  const [nome, setNome] = useState("");
  const [profissao, setProfissao] = useState("");
  const [cidade, setCidade] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [experiencia, setExperiencia] = useState("");

  // READ - carrega os profissionais da API
  useEffect(() => {
    async function carregarProfissionais() {
      try {
        const dados = await listarProfissionais();
        setProfissionais(dados);
      } catch (error) {
        console.error("Erro ao carregar profissionais:", error);
        setErroCarregamento(
          "Não foi possível carregar os profissionais. Verifique se a API está funcionando."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarProfissionais();
  }, []);

  function limparFormulario() {
    setIdEditando(null);
    setNome("");
    setProfissao("");
    setCidade("");
    setDisponibilidade("");
    setExperiencia("");
  }

  // Abre o formulário de edição preenchido com os dados do profissional
  function editarProfissional(profissional) {
    setErro("");
    setMensagem("");
    setIdEditando(profissional._id);
    setNome(profissional.nome || "");
    setProfissao(profissional.profissao || "");
    setCidade(profissional.cidade || "");
    setDisponibilidade(profissional.disponibilidade || "");
    setExperiencia(profissional.experiencia || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // UPDATE - envia as alterações para a API
  async function salvarEdicao(evento) {
    evento.preventDefault();
    setErro("");
    setMensagem("");

    if (!nome.trim() || !profissao || !cidade.trim() || !disponibilidade) {
      setErro("Preencha nome, profissão, cidade e disponibilidade.");
      return;
    }

    const dadosProfissional = {
      nome: nome.trim(),
      profissao,
      cidade: cidade.trim(),
      disponibilidade,
      experiencia: experiencia.trim()
    };

    setSalvando(true);

    try {
      await atualizarProfissional(idEditando, dadosProfissional);

      // Atualiza a tela com os dados enviados, sem depender do formato da resposta.
      setProfissionais((anteriores) =>
        anteriores.map((profissional) =>
          profissional._id === idEditando
            ? { ...profissional, ...dadosProfissional }
            : profissional
        )
      );

      limparFormulario();
      setMensagem("Profissional atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar profissional:", error);
      setErro("Não foi possível atualizar o profissional. Verifique a conexão com a API.");
    } finally {
      setSalvando(false);
    }
  }

  // DELETE - remove do banco (via API) e da tela
  async function handleExcluir(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este profissional?"
    );

    if (!confirmar) return;

    setErro("");
    setMensagem("");

    try {
      await excluirProfissional(id);

      setProfissionais((anteriores) =>
        anteriores.filter((profissional) => profissional._id !== id)
      );

      if (idEditando === id) {
        limparFormulario();
      }

      setMensagem("Profissional excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar profissional:", error);
      setErro("Não foi possível excluir o profissional.");
    }
  }

  return (
    <main className="page pagina-profissionais">
      <div className="profissionais-cabecalho">
        <h1>Encontre profissionais</h1>
        <p>
          Conheça talentos disponíveis para atuar
          em hotelaria, gastronomia e eventos.
        </p>
      </div>

      {carregando && <p>Carregando profissionais...</p>}

      {erroCarregamento && (
        <p role="alert" className="cadastro-erro">{erroCarregamento}</p>
      )}

      {erro && (
        <p role="alert" className="cadastro-erro">{erro}</p>
      )}

      {mensagem && (
        <p role="status" className="cadastro-mensagem">{mensagem}</p>
      )}

      {idEditando !== null && (
        <section className="secao-formulario">
          <h2>Editar profissional</h2>

          <form onSubmit={salvarEdicao}>
            <label htmlFor="edit-nome">Nome</label>
            <input
              id="edit-nome"
              type="text"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
              required
            />

            <label htmlFor="edit-profissao">Área de atuação</label>
            <select
              id="edit-profissao"
              value={profissao}
              onChange={(evento) => setProfissao(evento.target.value)}
              required
            >
              <option value="">Selecione a profissão</option>
              {PROFISSOES.map((opcao) => (
                <option key={opcao} value={opcao}>{opcao}</option>
              ))}
            </select>

            <label htmlFor="edit-cidade">Cidade</label>
            <input
              id="edit-cidade"
              type="text"
              value={cidade}
              onChange={(evento) => setCidade(evento.target.value)}
              required
            />

            <label htmlFor="edit-disponibilidade">Disponibilidade</label>
            <select
              id="edit-disponibilidade"
              value={disponibilidade}
              onChange={(evento) => setDisponibilidade(evento.target.value)}
              required
            >
              <option value="">Selecione a disponibilidade</option>
              {DISPONIBILIDADES.map((opcao) => (
                <option key={opcao} value={opcao}>{opcao}</option>
              ))}
            </select>

            <label htmlFor="edit-experiencia">Experiência profissional</label>
            <textarea
              id="edit-experiencia"
              rows={3}
              value={experiencia}
              onChange={(evento) => setExperiencia(evento.target.value)}
            />

            <div className="formulario-acoes">
              <button type="submit" disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar alterações"}
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

      {!carregando && !erroCarregamento && profissionais.length === 0 && (
        <p>Nenhum profissional cadastrado no momento.</p>
      )}

      {!carregando && !erroCarregamento && (
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

              <div className="vaga-acoes">
                <button onClick={() => setPerfilSelecionado(profissional)}>
                  Ver perfil
                </button>

                <button
                  className="botao-editar"
                  onClick={() => editarProfissional(profissional)}
                >
                  Editar
                </button>

                <button
                  className="botao-excluir"
                  onClick={() => handleExcluir(profissional._id)}
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

            <h2 id="titulo-perfil">{perfilSelecionado.nome}</h2>

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

            <button onClick={() => setPerfilSelecionado(null)}>
              Fechar perfil
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default Profissionais;
