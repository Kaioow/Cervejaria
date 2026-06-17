const STORAGE_KEY = 'clientes';

export const carregarClientes = () => {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
};

export const salvarClientes = (clientes) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(clientes)
  );
};