import "./App.css";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Vagas from "./page/Vagas";
import Profissionais from "./page/Profissionais";
import Cadastro from "./page/Cadastro";

function App() {
  const [pagina, setPagina] = useState("home");

  function mudarPagina(novaPagina) {
    setPagina(novaPagina);
  }

  return (
    <>
      <Navbar mudarPagina={mudarPagina} />

      {pagina === "home" && (
        <Home mudarPagina={mudarPagina} />
      )}

      {pagina === "vagas" && <Vagas />}
      {pagina === "profissionais" && <Profissionais />}
      {pagina === "cadastro" && <Cadastro />}
    </>
  );
}

export default App;
