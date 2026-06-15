import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cervejas() {
  const navigate = useNavigate();
  
  // Estado para armazenar a lista de cervejas
  const [cervejas, setCervejas] = useState([]);
  
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [estilo, setEstilo] = useState('');
  
  // Estado para saber se estamos editando alguma cerveja (guarda o ID)
  const [editandoId, setEditandoId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  // CREATE e UPDATE
  const salvarCerveja = (e) => {
    e.preventDefault(); // Evita que a página recarregue
    
    // Validação do Cadastro (Regra da avaliação)
    if (!nome || !estilo) {
      alert('Por favor, preencha o nome e o estilo da cerveja!');
      return;
    }

    if (editandoId) {
      // Lógica de UPDATE (Atualizar)
      const cervejasAtualizadas = cervejas.map((cerveja) => 
        cerveja.id === editandoId ? { ...cerveja, nome, estilo } : cerveja
      );
      setCervejas(cervejasAtualizadas);
      setEditandoId(null); // Sai do modo de edição
    } else {
      // Lógica de CREATE (Cadastrar)
      const novaCerveja = {
        id: Date.now(), // Simula um ID único
        nome,
        estilo
      };
      setCervejas([...cervejas, novaCerveja]);
    }

    // Limpa os campos após salvar
    setNome('');
    setEstilo('');
  };

  // Coloca os dados no formulário para editar
  const editarCerveja = (cerveja) => {
    setNome(cerveja.nome);
    setEstilo(cerveja.estilo);
    setEditandoId(cerveja.id);
  };

  // DELETE
  const excluirCerveja = (id) => {
    const cervejasFiltradas = cervejas.filter((cerveja) => cerveja.id !== id);
    setCervejas(cervejasFiltradas);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>🍻 Gestão de Cervejas</h2>
        <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Sair</button>
      </div>

      {/* Formulário de Cadastro/Edição */}
      <form onSubmit={salvarCerveja} style={{ display: 'flex', gap: '10px', marginBottom: '20px', marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder="Nome da Cerveja" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          style={{ flex: 1, padding: '8px' }}
        />
        <input 
          type="text" 
          placeholder="Estilo (ex: IPA, Pilsen)" 
          value={estilo} 
          onChange={(e) => setEstilo(e.target.value)} 
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
          {editandoId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      {/* READ - Listagem dinâmica com map() */}
      <h3>Lista de Cervejas</h3>
      {cervejas.length === 0 ? (
        <p>Nenhuma cerveja cadastrada ainda.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cervejas.map((cerveja) => (
            <li key={cerveja.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{cerveja.nome}</strong> - {cerveja.estilo}
              </div>
              <div>
                <button onClick={() => editarCerveja(cerveja)} style={{ marginRight: '5px', cursor: 'pointer' }}>✏️ Editar</button>
                <button onClick={() => excluirCerveja(cerveja.id)} style={{ cursor: 'pointer' }}>🗑️ Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cervejas;