import Sidebar from '../components/Sidebar';
import { useRelatorio } from '../hooks/useRelatorio';

function Relatorio() {
  const { dadosRelatorio,totalVendas,faturamentoTotal,} = useRelatorio();

  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <div className="page-container">

          <div className="page-header">
            <div>
              <h2>
                📊 Relatório de Vendas
              </h2>

              <p>
                JOIN entre Clientes,
                Cervejas e Vendas
              </p>
            </div>
          </div>

          <div className="dashboard-cards">
            

          
            <div className="dashboard-card">
              <h3>
                {totalVendas}
              </h3>

              <p>
                Total de Vendas
              </p>
            </div>

            <div className="dashboard-card">
              <h3>
                R$ {faturamentoTotal.toFixed(2)}
              </h3>

              <p>
                Faturamento Total
              </p>
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
                  <th>Quantidade</th>
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
                  dadosRelatorio.map(
                    (item) => (
                      <tr
                        key={item.idVenda}
                      >
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
                          R${' '}
                          {item.valorTotal.toFixed(2)}
                        </td>
                      </tr>
                    )
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Relatorio;