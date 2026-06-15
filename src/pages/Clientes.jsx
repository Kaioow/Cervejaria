import { useState, useEffect } from 'react';
import ClienteItem from '../components/ClienteItem';
import Sidebar from '../components/Sidebar';

function Clientes() {
  const [clientes, setClientes] = useState(() => {
    const dados = localStorage.getItem('clientes');
    return dados ? JSON.parse(dados) : [];
  });

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      'clientes',
      JSON.stringify(clientes)
    );
  }, [clientes]);

  const salvarCliente = (e) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim()) {
      alert('Preencha Nome e E-mail.');
      return;
    }

    if (editandoId) {
      const atualizados = clientes.map((cliente) =>
        cliente.id === editandoId
          ? {
              ...cliente,
              nome,
              email,
              telefone,
            }
          : cliente
      );

      setClientes(atualizados);
    } else {
      const novoCliente = {
        id: Date.now(),
        nome,
        email,
        telefone,
      };

      setClientes([...clientes, novoCliente]);
    }

    limparFormulario();
  };

  const limparFormulario = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setEditandoId(null);
  };

  const editarCliente = (cliente) => {
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setEditandoId(cliente.id);
  };

  const excluirCliente = (id) => {
    if (
      !window.confirm(
        'Deseja excluir este cliente?'
      )
    ) {
      return;
    }

    const filtrados = clientes.filter(
      (cliente) => cliente.id !== id
    );

    setClientes(filtrados);
  };

  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <div className="page-container">

          <div className="page-header">
            <div>
              <h2>👥 Gestão de Clientes</h2>
              <p>
                Cadastro e gerenciamento de clientes
              </p>
            </div>
          </div>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>{clientes.length}</h3>
              <p>Clientes cadastrados</p>
            </div>
          </div>

          <div className="form-card">

            <h3>
              {editandoId
                ? 'Editar Cliente'
                : 'Novo Cliente'}
            </h3>

            <form
              className="form-grid"
              onSubmit={salvarCliente}
            >
              <input
                type="text"
                placeholder="Nome do Cliente"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
              />

              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) =>
                  setTelefone(e.target.value)
                }
              />

              <button
                type="submit"
                className="success-btn"
              >
                {editandoId
                  ? 'Atualizar Cliente'
                  : 'Cadastrar Cliente'}
              </button>
            </form>

          </div>

          <div className="form-card">

            <h3>Lista de Clientes</h3>

            {clientes.length === 0 ? (
              <p>
                Nenhum cliente cadastrado.
              </p>
            ) : (
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                }}
              >
                {clientes.map((cliente) => (
                  <ClienteItem
                    key={cliente.id}
                    cliente={cliente}
                    aoEditar={editarCliente}
                    aoExcluir={excluirCliente}
                  />
                ))}
              </ul>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Clientes;