import Sidebar from '../components/Sidebar';
import { useVendas } from '../hooks/useVendas';

function Vendas() {
  const {
    vendas,
    clientes,
    cervejas,
    clienteId,
    setClienteId,
    cervejaId,
    setCervejaId,
    quantidade,
    setQuantidade,
    editandoId,
    salvarVenda,
    editarVenda,
    excluirVenda,
    faturamentoTotal,
  } = useVendas();

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <div className="page-container">
          <div className="page-header">
            <div>
              <h2>💰 Registro de Vendas</h2>
              <p>Relacionamento entre clientes e cervejas</p>
            </div>
          </div>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>{vendas.length}</h3>
              <p>Vendas registradas</p>
            </div>

            <div className="dashboard-card">
              <h3>R$ {faturamentoTotal.toFixed(2)}</h3>
              <p>Faturamento</p>
            </div>
          </div>

          <div className="form-card">
            <h3>{editandoId ? 'Editar Venda' : 'Nova Venda'}</h3>

            <form className="form-grid" onSubmit={salvarVenda}>
              <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
                <option value="">Selecione um Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>

              <select value={cervejaId} onChange={(e) => setCervejaId(e.target.value)}>
                <option value="">Selecione uma Cerveja</option>
                {cervejas.map((cerveja) => (
                  <option key={cerveja.id} value={cerveja.id}>
                    {cerveja.nome}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />

         
              <button type="submit" className="success-btn">
                {editandoId ? 'Atualizar Venda' : 'Registrar Venda'}
              </button>
            </form>
          </div>

          <div className="form-card">
            <h3>Histórico de Vendas</h3>

            {vendas.length === 0 ? (
              <p>Nenhuma venda registrada.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {vendas.map((venda) => {
                  const cliente = clientes.find((c) => c.id === venda.clienteId);
                  const cerveja = cervejas.find((c) => c.id === venda.cervejaId);

                  return (
                    <li key={venda.id} className="list-card">
                      <div>
                        <strong>{cliente?.nome || 'Cliente removido'}</strong>
                        <br />
                        <small>{cerveja?.nome || 'Cerveja removida'}</small>
                        <br />
                        <small>Quantidade: {venda.quantidade}</small>
                        <br />
                        <small>Total: R$ {venda.valorTotal.toFixed(2)}</small>
                      </div>

                      <div className="actions">
                        <button
                          className="primary-btn"
                          onClick={() => editarVenda(venda)}
                        >
                          Editar
                        </button>

                        <button
                          className="danger-btn"
                          onClick={() => excluirVenda(venda.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendas;