import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Vendas() {
  const navigate = useNavigate();

  const [vendas, setVendas] = useState(() => {
    const dados = localStorage.getItem('vendas');
    return dados ? JSON.parse(dados) : [];
  });

  const [clientes, setClientes] = useState([]);
  const [cervejas, setCervejas] = useState([]);

  const [clienteId, setClienteId] = useState('');
  const [cervejaId, setCervejaId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      'vendas',
      JSON.stringify(vendas)
    );
  }, [vendas]);

  useEffect(() => {
    const clientesSalvos =
      JSON.parse(localStorage.getItem('clientes')) || [];

    const cervejasSalvas =
      JSON.parse(localStorage.getItem('cervejas')) || [];

    setClientes(clientesSalvos);
    setCervejas(cervejasSalvas);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  const limparFormulario = () => {
    setClienteId('');
    setCervejaId('');
    setQuantidade('');
    setValorTotal('');
    setEditandoId(null);
  };

  const salvarVenda = (e) => {
    e.preventDefault();

    if (
      !clienteId ||
      !cervejaId ||
      !quantidade ||
      !valorTotal
    ) {
      alert('Preencha todos os campos.');
      return;
    }

    if (editandoId) {
      const atualizadas = vendas.map((venda) =>
        venda.id === editandoId
          ? {
              ...venda,
              clienteId: Number(clienteId),
              cervejaId: Number(cervejaId),
              quantidade: Number(quantidade),
              valorTotal: Number(valorTotal),
            }
          : venda
      );

      setVendas(atualizadas);
    } else {
      const novaVenda = {
        id: Date.now(),
        clienteId: Number(clienteId),
        cervejaId: Number(cervejaId),
        quantidade: Number(quantidade),
        valorTotal: Number(valorTotal),
      };

      setVendas([...vendas, novaVenda]);
    }

    limparFormulario();
  };

  const editarVenda = (venda) => {
    setClienteId(venda.clienteId);
    setCervejaId(venda.cervejaId);
    setQuantidade(venda.quantidade);
    setValorTotal(venda.valorTotal);
    setEditandoId(venda.id);
  };

  const excluirVenda = (id) => {
    if (
      !window.confirm(
        'Deseja excluir esta venda?'
      )
    ) {
      return;
    }

    setVendas(
      vendas.filter((venda) => venda.id !== id)
    );
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h2>💰 Registro de Vendas</h2>
          <p>Relacionamento entre Clientes e Cervejas</p>
        </div>

        <div className="page-actions">
          <button
            className="primary-btn"
            onClick={() => navigate('/clientes')}
          >
            👥 Clientes
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate('/relatorio')}
          >
            📊 Relatório
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
          <h3>{vendas.length}</h3>
          <p>Vendas Registradas</p>
        </div>
      </div>

      <div className="form-card">
        <h3>
          {editandoId
            ? 'Editar Venda'
            : 'Nova Venda'}
        </h3>

        <form
          className="form-grid"
          onSubmit={salvarVenda}
        >
          <select
            value={clienteId}
            onChange={(e) =>
              setClienteId(e.target.value)
            }
          >
            <option value="">
              Selecione o Cliente
            </option>

            {clientes.map((cliente) => (
              <option
                key={cliente.id}
                value={cliente.id}
              >
                {cliente.nome}
              </option>
            ))}
          </select>

          <select
            value={cervejaId}
            onChange={(e) =>
              setCervejaId(e.target.value)
            }
          >
            <option value="">
              Selecione a Cerveja
            </option>

            {cervejas.map((cerveja) => (
              <option
                key={cerveja.id}
                value={cerveja.id}
              >
                {cerveja.nome}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) =>
              setQuantidade(e.target.value)
            }
          />

          <input
            type="number"
            step="0.01"
            placeholder="Valor Total"
            value={valorTotal}
            onChange={(e) =>
              setValorTotal(e.target.value)
            }
          />

          <button
            type="submit"
            className="success-btn"
          >
            {editandoId
              ? 'Atualizar Venda'
              : 'Registrar Venda'}
          </button>
        </form>
      </div>

      <div className="form-card">
        <h3>Histórico de Vendas</h3>

        {vendas.length === 0 ? (
          <p>Nenhuma venda registrada.</p>
        ) : (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
            }}
          >
            {vendas.map((venda) => {
              const cliente =
                clientes.find(
                  (c) => c.id === venda.clienteId
                );

              const cerveja =
                cervejas.find(
                  (c) => c.id === venda.cervejaId
                );

              return (
                <li
                  key={venda.id}
                  className="list-card"
                >
                  <div>
                    <strong>
                      {cliente?.nome ||
                        'Cliente removido'}
                    </strong>

                    <br />

                    <small>
                      {cerveja?.nome ||
                        'Cerveja removida'}
                    </small>

                    <br />

                    <small>
                      Quantidade: {venda.quantidade}
                    </small>

                    <br />

                    <small>
                      Total: R${' '}
                      {venda.valorTotal.toFixed(2)}
                    </small>
                  </div>

                  <div className="actions">
                    <button
                      className="primary-btn"
                      onClick={() =>
                        editarVenda(venda)
                      }
                    >
                      ✏️ Editar
                    </button>

                    <button
                      className="danger-btn"
                      onClick={() =>
                        excluirVenda(venda.id)
                      }
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

    </div>
  );
}

export default Vendas;