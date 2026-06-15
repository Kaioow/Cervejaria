import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Relatorio() {
  const navigate = useNavigate();

  const [dadosRelatorio, setDadosRelatorio] = useState([]);

  useEffect(() => {
    const clientes =
      JSON.parse(localStorage.getItem('clientes')) || [];

    const cervejas =
      JSON.parse(localStorage.getItem('cervejas')) || [];

    const vendas =
      JSON.parse(localStorage.getItem('vendas')) || [];

    const relatorioJoin = vendas.map((venda) => {
      const cliente = clientes.find(
        (c) => c.id === venda.clienteId
      );

      const cerveja = cervejas.find(
        (c) => c.id === venda.cervejaId
      );

      return {
        idVenda: venda.id,
        clienteNome:
          cliente?.nome || 'Cliente Removido',

        clienteEmail:
          cliente?.email || '-',

        cervejaNome:
          cerveja?.nome || 'Cerveja Removida',

        estilo:
          cerveja?.estilo || '-',

        quantidade: venda.quantidade,

        valorTotal: venda.valorTotal,
      };
    });

    setDadosRelatorio(relatorioJoin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  const valorTotalGeral = dadosRelatorio.reduce(
    (total, venda) =>
      total + venda.valorTotal,
    0
  );

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h2>📊 Relatório de Vendas</h2>
          <p>
            JOIN entre Clientes,
            Cervejas e Vendas
          </p>
        </div>

        <div className="page-actions">

          <button
            className="primary-btn"
            onClick={() =>
              navigate('/clientes')
            }
          >
            👥 Clientes
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              navigate('/vendas')
            }
          >
            💰 Vendas
          </button>

          <button
            className="danger-btn"
            onClick={handleLogout}
          >
            Sair
          </button>

        </div>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>{dadosRelatorio.length}</h3>
          <p>Total de Vendas</p>
        </div>

        <div className="dashboard-card">
          <h3>
            R$ {valorTotalGeral.toFixed(2)}
          </h3>
          <p>Faturamento</p>
        </div>

      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID Venda</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Cerveja</th>
              <th>Estilo</th>
              <th>Qtd</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>

            {dadosRelatorio.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: 'center',
                    padding: '20px',
                  }}
                >
                  Nenhuma venda encontrada.
                </td>
              </tr>
            ) : (
              dadosRelatorio.map((item) => (
                <tr key={item.idVenda}>

                  <td>
                    {item.idVenda}
                  </td>

                  <td>
                    {item.clienteNome}
                  </td>

                  <td>
                    {item.clienteEmail}
                  </td>

                  <td>
                    {item.cervejaNome}
                  </td>

                  <td>
                    {item.estilo}
                  </td>

                  <td>
                    {item.quantidade}
                  </td>

                  <td>
                    R$ {item.valorTotal.toFixed(2)}
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Relatorio;