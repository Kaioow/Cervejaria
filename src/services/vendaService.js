export const carregarVendas = () => {
  const dados = localStorage.getItem('vendas');
  return dados ? JSON.parse(dados) : [];
};

export const salvarVendas = (vendas) => {
  localStorage.setItem(
    'vendas',
    JSON.stringify(vendas)
  );
};

export const carregarClientes = () => {
  return (
    JSON.parse(
      localStorage.getItem('clientes')
    ) || []
  );
};

export const carregarCervejas = () => {
  return (
    JSON.parse(
      localStorage.getItem('cervejas')
    ) || []
  );
};