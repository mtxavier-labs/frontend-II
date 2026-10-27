import { useState } from "react";

const API_URL = "http://localhost:3000/api/profissionais";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("profissional");
  const [profissao, setProfissao] = useState("");
  const [cidade, setCidade] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function cadastrar(evento) {
    evento.preventDefault();

    setMensagem("");
    setErro("");

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();

    if (!nomeLimpo || !emailLimpo) {
      setErro("Preencha os campos obrigatórios.");
      return;
    }

    if (
      tipo === "profissional" &&
      (!profissao || !cidade.trim() || !disponibilidade)
    ) {
      setErro(
        "Informe sua profissão, cidade e disponibilidade."
      );
      return;
    }

    setSalvando(true);

    try {
      if (tipo === "profissional") {
        // Envia apenas os dados do perfil profissional.
        // Nenhuma senha é enviada ou armazenada.
        const novoProfissional = {
          nome: nomeLimpo,
          profissao,
          cidade: cidade.trim(),
          disponibilidade,
          experiencia: experiencia.trim()
        };

        const resposta = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(novoProfissional)
        });

        if (!resposta.ok) {
          throw new Error("Não foi possível salvar o profissional.");
        }

        setMensagem(
          "Perfil profissional cadastrado com sucesso! Confira na página Encontre profissionais."
        );
      } else {
        // Mantém o cadastro demonstrativo de empresas,
        // sem guardar senhas no navegador.
        const dadosEmpresas = JSON.parse(
          localStorage.getItem("empresas") || "[]"
        );

        const empresas = Array.isArray(dadosEmpresas)
          ? dadosEmpresas
          : [];

        const emailExistente = empresas.some(
          (empresa) =>
            empresa.email?.toLowerCase() === emailLimpo
        );

        if (emailExistente) {
          setErro("Este e-mail já está cadastrado.");
          return;
        }

        const novaEmpresa = {
          id: Date.now(),
          nome: nomeLimpo,
          email: emailLimpo,
          tipo: "empresa"
        };

        localStorage.setItem(
          "empresas",
          JSON.stringify([...empresas, novaEmpresa])
        );

        setMensagem(
          "Cadastro demonstrativo da empresa realizado com sucesso!"
        );
      }

      setNome("");
      setEmail("");
      setTipo("profissional");
      setProfissao("");
      setCidade("");
      setDisponibilidade("");
      setExperiencia("");
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      setErro(
        "Não foi possível realizar o cadastro. Verifique se o Back-End está funcionando."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="page pagina-cadastro">
      <div className="cadastro-cabecalho">
        <span className="cadastro-etiqueta">
          Faça parte do Trampo Certo
        </span>

        <h1>Crie seu perfil</h1>

        <p>
          Cadastre-se no Trampo Certo para encontrar
          oportunidades ou contratar profissionais
          de hotelaria, gastronomia e eventos.
        </p>
      </div>

      <section className="cadastro-container">
        <div className="cadastro-formulario">
          <h2>Seus dados</h2>

          <p>
            Preencha as informações abaixo para
            cadastrar seu perfil.
          </p>

          <form onSubmit={cadastrar}>
            <label htmlFor="nome">
              Nome completo ou nome da empresa
            </label>

            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
              required
            />

            <label htmlFor="email">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              required
            />

            <label htmlFor="tipo">
              Quero me cadastrar como:
            </label>

            <select
              id="tipo"
              value={tipo}
              onChange={(evento) => setTipo(evento.target.value)}
            >
              <option value="profissional">
                Profissional
              </option>
              <option value="empresa">
                Empresa
              </option>
            </select>

            {tipo === "profissional" && (
              <>
                <label htmlFor="profissao">
                  Área de atuação
                </label>

                <select
                  id="profissao"
                  value={profissao}
                  onChange={(evento) =>
                    setProfissao(evento.target.value)
                  }
                  required
                >
                  <option value="">
                    Selecione sua profissão
                  </option>
                  <option value="Garçom/Garçonete">
                    Garçom/Garçonete
                  </option>
                  <option value="Cozinheiro">
                    Cozinheiro
                  </option>
                  <option value="Bartender">
                    Bartender
                  </option>
                  <option value="Auxiliar de Eventos">
                    Auxiliar de Eventos
                  </option>
                  <option value="Recepcionista">
                    Recepcionista
                  </option>
                </select>

                <label htmlFor="cidade">
                  Cidade
                </label>

                <input
                  id="cidade"
                  type="text"
                  placeholder="Ex.: Florianópolis"
                  value={cidade}
                  onChange={(evento) =>
                    setCidade(evento.target.value)
                  }
                  required
                />

                <label htmlFor="disponibilidade">
                  Disponibilidade
                </label>

                <select
                  id="disponibilidade"
                  value={disponibilidade}
                  onChange={(evento) =>
                    setDisponibilidade(evento.target.value)
                  }
                  required
                >
                  <option value="">
                    Selecione sua disponibilidade
                  </option>
                  <option value="Durante a semana">
                    Durante a semana
                  </option>
                  <option value="Finais de semana">
                    Finais de semana
                  </option>
                  <option value="Horários flexíveis">
                    Horários flexíveis
                  </option>
                </select>

                <label htmlFor="experiencia">
                  Experiência profissional
                </label>

                <textarea
                  id="experiencia"
                  placeholder="Conte um pouco sobre sua experiência"
                  value={experiencia}
                  onChange={(evento) =>
                    setExperiencia(evento.target.value)
                  }
                  rows={3}
                />
              </>
            )}

            <button
              type="submit"
              className="cadastro-botao"
              disabled={salvando}
            >
              {salvando
                ? "Cadastrando..."
                : "Criar cadastro"}
            </button>
          </form>

          {erro && (
            <p className="cadastro-erro" role="alert">
              {erro}
            </p>
          )}

          {mensagem && (
            <p
              className="cadastro-mensagem"
              role="status"
            >
              {mensagem}
            </p>
          )}
        </div>

        <aside className="cadastro-beneficios">
          <h2>Por que se cadastrar?</h2>

          <div className="beneficio">
            <span>01</span>
            <div>
              <h3>Mais oportunidades</h3>
              <p>
                Encontre trabalhos e profissionais
                do setor de hospitalidade.
              </p>
            </div>
          </div>

          <div className="beneficio">
            <span>02</span>
            <div>
              <h3>Perfil profissional</h3>
              <p>
                Apresente sua profissão e
                disponibilidade para novas oportunidades.
              </p>
            </div>
          </div>

          <div className="beneficio">
            <span>03</span>
            <div>
              <h3>Conexões locais</h3>
              <p>
                Conecte-se ao mercado de hotelaria,
                gastronomia e eventos.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Cadastro;
