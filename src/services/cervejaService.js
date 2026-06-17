const STORAGE_KEY = 'cervejas';

export const carregarCervejas = () => {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
};

export const salvarCervejas = (cervejas) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(cervejas)
  );
};