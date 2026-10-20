
function Home({ mudarPagina }) {
  return (
    <main>
      <section className="home hero-home">
        <span className="home-etiqueta">
          Oportunidades em Florianópolis
        </span>

        <h1>
          Seu próximo trabalho começa
          <span> aqui.</span>
        </h1>

        <p>
          Conectamos profissionais de hotelaria,
          gastronomia e eventos a empresas que
          precisam de talentos.
        </p>

        <div className="home-acoes">
          <button
            onClick={() => mudarPagina("vagas")}
          >
            Encontrar vagas
          </button>

          <button
            className="botao-secundario"
            onClick={() => mudarPagina("profissionais")}
          >
            Encontrar profissionais
          </button>
        </div>
      </section>

      <section className="como-funciona">
        <h2>Como funciona o Trampo Certo?</h2>

        <div className="cards">
          <div className="card">
            <h3>1. Cadastre-se</h3>
            <p>
              Crie seu perfil e informe sua
              área de atuação.
            </p>
          </div>

          <div className="card">
            <h3>2. Encontre oportunidades</h3>
            <p>
              Explore vagas disponíveis em
              estabelecimentos e eventos.
            </p>
          </div>

          <div className="card">
            <h3>3. Conecte-se</h3>
            <p>
              Conheça profissionais e encontre
              novas possibilidades de trabalho.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
