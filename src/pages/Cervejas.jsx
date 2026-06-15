import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

function Cervejas() {
  const [cervejas, setCervejas] = useState(() => {
    const dados = localStorage.getItem('cervejas');
    return dados ? JSON.parse(dados) : [];
  });

  const [nome, setNome] = useState('');
  const [estilo, setEstilo] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      'cervejas',
      JSON.stringify(cervejas)
    );
  }, [cervejas]);

  const salvarCerveja = (e) => {
    e.preventDefault();

    if (!nome.trim() || !estilo.trim()) {
      alert(
        'Informe o nome e o estilo da cerveja.'
      );
      return;
    }

    if (editandoId) {
      const atualizadas = cervejas.map(
        (cerveja) =>
          cerveja.id === editandoId
            ? {
                ...cerveja,
                nome,
                estilo,
              }
            : cerveja
      );

      setCervejas(atualizadas);
    } else {
      const novaCerveja = {
        id: Date.now(),
        nome,
        estilo,
      };

      setCervejas([
        ...cervejas,
        novaCerveja,
      ]);
    }

    limparFormulario();
  };

  const limparFormulario = () => {
    setNome('');
    setEstilo('');
    setEditandoId(null);
  };

  const editarCerveja = (cerveja) => {
    setNome(cerveja.nome);
    setEstilo(cerveja.estilo);
    setEditandoId(cerveja.id);
  };

  const excluirCerveja = (id) => {
    if (
      !window.confirm(
        'Deseja excluir esta cerveja?'
      )
    ) {
      return;
    }

    const filtradas = cervejas.filter(
      (cerveja) => cerveja.id !== id
    );

    setCervejas(filtradas);
  };

  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <div className="page-container">

          <div className="page-header">
            <div>
              <h2>🍻 Gestão de Cervejas</h2>
              <p>
                Cadastro e gerenciamento de cervejas
              </p>
            </div>
          </div>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>{cervejas.length}</h3>
              <p>Cervejas cadastradas</p>
            </div>
          </div>

          <div className="form-card">

            <h3>
              {editandoId
                ? 'Editar Cerveja'
                : 'Nova Cerveja'}
            </h3>

            <form
              className="form-grid"
              onSubmit={salvarCerveja}
            >
              <input
                type="text"
                placeholder="Nome da cerveja"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Estilo (IPA, Pilsen, Stout...)"
                value={estilo}
                onChange={(e) =>
                  setEstilo(e.target.value)
                }
              />

              <button
                type="submit"
                className="success-btn"
              >
                {editandoId
                  ? 'Atualizar Cerveja'
                  : 'Cadastrar Cerveja'}
              </button>
            </form>

          </div>

          <div className="form-card">

            <h3>Lista de Cervejas</h3>

            {cervejas.length === 0 ? (
              <p>
                Nenhuma cerveja cadastrada.
              </p>
            ) : (
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                }}
              >
                {cervejas.map(
                  (cerveja) => (
                    <li
                      key={cerveja.id}
                      className="list-card"
                    >
                      <div>
                        <strong>
                          {cerveja.nome}
                        </strong>

                        <br />

                        <small>
                          Estilo: {cerveja.estilo}
                        </small>
                      </div>

                      <div className="actions">

                        <button
                          className="primary-btn"
                          onClick={() =>
                            editarCerveja(
                              cerveja
                            )
                          }
                        >
                          ✏️ Editar
                        </button>

                        <button
                          className="danger-btn"
                          onClick={() =>
                            excluirCerveja(
                              cerveja.id
                            )
                          }
                        >
                          🗑️ Excluir
                        </button>

                      </div>
                    </li>
                  )
                )}
              </ul>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cervejas;