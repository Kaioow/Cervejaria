import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useCervejas } from '../hooks/useCervejas';

function Cervejas() {
  const { cervejas, adicionar, atualizar, remover } = useCervejas();

  const [nome, setNome] = useState('');
  const [estilo, setEstilo] = useState('');
  const [valor, setValor] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const limparFormulario = () => {
    setNome('');
    setEstilo('');
    setValor('');
    setEditandoId(null);
  };

  const salvarCerveja = (e) => {
    e.preventDefault();

    if (!nome.trim() || !estilo.trim() || !valor) {
      alert('Informe todos os campos.');
      return;
    }

    if (editandoId) {
      atualizar(editandoId, nome, estilo, valor);
    } else {
      adicionar(nome, estilo, valor);
    }

    limparFormulario();
  };

  const editarCerveja = (cerveja) => {
    setNome(cerveja.nome);
    setEstilo(cerveja.estilo);
    setValor(cerveja.valor);
    setEditandoId(cerveja.id);
  };

  const excluirCerveja = (id) => {
    if (window.confirm('Deseja excluir esta cerveja?')) {
      remover(id);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <div className="page-container">

          {/* HEADER */}
          <div className="page-header">
            <div>
              <h2>🍻 Gestão de Cervejas</h2>
              <p>Controle do catálogo de produtos da cervejaria.</p>
            </div>
          </div>

          {/* CARDS */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>{cervejas.length}</h3>
              <p>Cervejas cadastradas</p>
            </div>
          </div>

          {/* FORMULÁRIO */}
          <div className="form-card">
            <h3>{editandoId ? 'Editar Cerveja' : 'Nova Cerveja'}</h3>

            <form className="form-grid" onSubmit={salvarCerveja}>

              <input
                type="text"
                placeholder="Nome da cerveja"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <input
                type="text"
                placeholder="Estilo (IPA, Pilsen, Stout...)"
                value={estilo}
                onChange={(e) => setEstilo(e.target.value)}
              />

              <input
                type="number"
                step="0.01"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />

              <button type="submit" className="success-btn">
                {editandoId ? 'Atualizar Cerveja' : 'Cadastrar Cerveja'}
              </button>

            </form>
          </div>

          {/* LISTA MODERNA */}
          <div className="form-card">
            <h3>Lista de Cervejas</h3>

            {cervejas.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#9ca3af' }}>
                🍺 Nenhuma cerveja cadastrada ainda.
              </p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>

                {cervejas.map((cerveja) => (
                  <li key={cerveja.id} className="list-card">

                    <div>
                      <strong>{cerveja.nome}</strong>

                      <br />

                      <small style={{ color: '#9ca3af' }}>
                        Estilo: {cerveja.estilo}
                        <br />
                        Valor: R$ {Number(cerveja.valor).toFixed(2)}
                      </small>
                    </div>

                    <div className="actions">

                      <button
                        className="primary-btn"
                        onClick={() => editarCerveja(cerveja)}
                      >
                        ✏️ Editar
                      </button>

                      <button
                        className="danger-btn"
                        onClick={() => excluirCerveja(cerveja.id)}
                      >
                        🗑 Excluir
                      </button>

                    </div>

                  </li>
                ))}

              </ul>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Cervejas;