// URL base da API (Back-End).
// Local: usa http://localhost:3000
// Produção (Vercel): defina VITE_API_URL nas variáveis de ambiente do projeto do Front-End.
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");
