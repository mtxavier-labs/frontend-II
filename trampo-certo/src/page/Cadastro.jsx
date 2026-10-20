import { useState } from "react";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("profissional");
  const [profissao, setProfissao] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function cadastrar(evento) {
    evento.preventDefault();

    setMensagem("");
    setErro("");

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();

    if (!nomeLimpo || !emailLimpo || !senha.trim()) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (tipo === "profissional" && (!profissao || !disponibilidade)) {
      setErro("Informe sua profissão e disponibilidade.");
      return;
    }

    try {
      const dadosUsuarios = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );

      const usuarios = Array.isArray(dadosUsuarios)
        ? dadosUsuarios
        : [];

      const emailExistente = usuarios.some(
        (usuario) =>
          usuario.email?.trim().toLowerCase() === emailLimpo
      );

      if (emailExistente) {
        setErro("Este e-mail já está cadastrado.");
        return;
      }

      const id = Date.now();

      const novoUsuario = {
        id,
        nome: nomeLimpo,
        email: emailLimpo,
        senha,
        tipo
      };

      // Mantém o cadastro de usuários criado pelo colega.
      // Protótipo acadêmico: não usar senhas reais.
      localStorage.setItem(
        "usuarios",
        JSON.stringify([...usuarios, novoUsuario])
      );

      // Mantém a integração com a página Profissionais.
      if (tipo === "profissional") {
        const dadosProfissionais = JSON.parse(
          localStorage.getItem("profissionais") || "[]"
        );

        const profissionais = Array.isArray(dadosProfissionais)
          ? dadosProfissionais
          : [];

        const novoProfissional = {
          id,
          nome: nomeLimpo,
          email: emailLimpo,
          profissao,
          disponibilidade
        };

        localStorage.setItem(
          "profissionais",
          JSON.stringify([
            ...profissionais,
            novoProfissional
          ])
        );
      }

      setMensagem("Cadastro realizado com sucesso!");

      setNome("");
      setEmail("");
      setSenha("");
      setTipo("profissional");
      setProfissao("");
      setDisponibilidade("");
    } catch {
      setErro("Não foi possível realizar o cadastro.");
    }
  }

  return (
    <main className="page pagina-cadastro">
      <div className="cadastro-cabecalho">
        <span className="cadastro-etiqueta">
          Faça parte do Trampo Certo
        </span>

        <h1>Crie sua conta</h1>

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
            Preencha as informações abaixo para criar
            sua conta.
          </p>

          <form onSubmit={cadastrar}>
            <label htmlFor="nome">
              Nome completo
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

            <label htmlFor="senha">
              Senha
            </label>

            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(evento) => setSenha(evento.target.value)}
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
              </>
            )}

            <button
              type="submit"
              className="cadastro-botao"
            >
              Criar cadastro
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
