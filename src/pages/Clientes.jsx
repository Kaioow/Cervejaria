import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClienteItem from '../components/ClienteItem';

function Clientes() {
  const navigate = useNavigate();
  
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  const salvarCliente = (e) => {
    e.preventDefault();
    
    if (!nome || !email) {
      alert('Por favor, preencha pelo menos nome e e-mail!');
      return;
    }

    if (editandoId) {
      const clientesAtualizados = clientes.map((cliente) => 
        cliente.id === editandoId ? { ...cliente, nome, email, telefone } : cliente
      );
      setClientes(clientesAtualizados);
      setEditandoId(null);
    } else {
      const novoCliente = { id: Date.now(), nome, email, telefone };
      setClientes([...clientes, novoCliente]);
    }

    setNome('');
    setEmail('');
    setTelefone('');
  };

  const editarCliente = (cliente) => {
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setEditandoId(cliente.id);
  };

  const excluirCliente = (id) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>👥 Gestão de Clientes</h2>
        <div>
          <button onClick={() => navigate('/cervejas')} style={{ marginRight: '10px', cursor: 'pointer' }}>🍻 Ver Cervejas</button>
          <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Sair</button>
        </div>
      </div>

      <form onSubmit={salvarCliente} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', marginTop: '20px' }}>
        <input type="text" placeholder="Nome do Cliente" value={nome} onChange={(e) => setNome(e.target.value)} style={{ padding: '8px' }} />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '8px' }} />
        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
          {editandoId ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
        </button>
      </form>

      <h3>Lista de Clientes</h3>
      {clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
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
  );
}

export default Clientes;