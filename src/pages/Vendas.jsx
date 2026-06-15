import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Vendas() {
  const navigate = useNavigate();

  // Estado que inicia buscando dados do localStorage (Exigência de Persistência)
  const [vendas, setVendas] = useState(() => {
    const dadosSalvos = localStorage.getItem('vendas');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  // Estados do formulário
  const [clienteId, setClienteId] = useState('');
  const [cervejaId, setCervejaId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // Efeito para salvar no localStorage automaticamente sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('vendas', JSON.stringify(vendas));
  }, [vendas]);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  const salvarVenda = (e) => {
    e.preventDefault();

    // Validação de campos (useState)
    if (!clienteId || !cervejaId || !quantidade || !valorTotal) {
      alert('Por favor, preencha todos os campos da venda!');
      return;
    }

    if (editandoId) {
      // Lógica de UPDATE
      const novasVendas = vendas.map((venda) =>
        venda.id === editandoId 
          ? { ...venda, clienteId: Number(clienteId), cervejaId: Number(cervejaId), quantidade: Number(quantidade), valorTotal: Number(valorTotal) } 
          : venda
      );
      setVendas(novasVendas);
      setEditandoId(null);
    } else {
      // Lógica de CREATE (Usando chave estrangeira simulada por ID)
      const novaVenda = {
        id: Date.now(),
        clienteId: Number(clienteId), // Relacionará com o Cliente
        cervejaId: Number(cervejaId), // Relacionará com a Cerveja
        quantidade: Number(quantidade),
        valorTotal: Number(valorTotal)
      };
      setVendas([...vendas, novaVenda]);
    }

    // Limpar campos
    setClienteId('');
    setCervejaId('');
    setQuantidade('');
    setValorTotal('');
  };

  const editarVenda = (venda) => {
    setClienteId(venda.clienteId);
    setCervejaId(venda.cervejaId);
    setQuantidade(venda.quantidade);
    setValorTotal(venda.valorTotal);
    setEditandoId(venda.id);
  };

  const excluirVenda = (id) => {
    setVendas(vendas.filter((venda) => venda.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>💰 Registro de Vendas</h2>
        <div>
          <button onClick={() => navigate('/clientes')} style={{ marginRight: '10px', cursor: 'pointer' }}>👥 Ver Clientes</button>
          <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Sair</button>
        </div>
      </div>

      <form onSubmit={salvarVenda} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', marginTop: '20px' }}>
        <input type="number" placeholder="ID do Cliente (Chave Estrangeira)" value={clienteId} onChange={(e) => setClienteId(e.target.value)} style={{ padding: '8px' }} />
        <input type="number" placeholder="ID da Cerveja (Chave Estrangeira)" value={cervejaId} onChange={(e) => setCervejaId(e.target.value)} style={{ padding: '8px' }} />
        <input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} style={{ padding: '8px' }} />
        <input type="number" step="0.01" placeholder="Valor Total (R$)" value={valorTotal} onChange={(e) => setValorTotal(e.target.value)} style={{ padding: '8px' }} />
        
        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
          {editandoId ? 'Atualizar Venda' : 'Registrar Venda'}
        </button>
      </form>

      <h3>Histórico de Vendas (Salvo no Navegador)</h3>
      {vendas.length === 0 ? (
        <p>Nenhuma venda registrada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {vendas.map((venda) => (
            <li key={venda.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Venda ID: {venda.id}</strong> <br />
                <small>Cliente ID: {venda.clienteId} | Cerveja ID: {venda.cervejaId}</small> <br />
                <small>Qtd: {venda.quantidade} | Total: R$ {venda.valorTotal.toFixed(2)}</small>
              </div>
              <div>
                <button onClick={() => editarVenda(venda)} style={{ marginRight: '5px', cursor: 'pointer' }}>✏️ Editar</button>
                <button onClick={() => excluirVenda(venda.id)} style={{ cursor: 'pointer' }}>🗑️ Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Vendas;