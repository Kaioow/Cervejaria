export const gerarRelatorio = () => {

  const clientes = JSON.parse( localStorage.getItem('clientes') ) || [];

  const cervejas = JSON.parse(localStorage.getItem('cervejas')  ) || [];

  const vendas =JSON.parse( localStorage.getItem('vendas')   ) || [];


  return vendas.map((venda) => {
    const cliente = clientes.find((c) => c.id === venda.clienteId );

    const cerveja = cervejas.find( (c) => c.id === venda.cervejaId);

    return {
      idVenda: venda.id,

      clienteNome:
        cliente?.nome || 'Cliente Removido',

      clienteEmail: cliente?.email || '-',

      cervejaNome:
        cerveja?.nome ||'Cerveja Removida',

      estilo:
        cerveja?.estilo || '-',

      quantidade:
        venda.quantidade,

      valorTotal:
        venda.valorTotal,
    };
  });
};