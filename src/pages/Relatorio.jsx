import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Relatorio() {
  const navigate = useNavigate();
  const [dadosRelatorio, setDadosRelatorio] = useState([]);

  useEffect(() => {
    // 1. Busca as vendas salvas no localStorage (entidade principal)
    const vendasSalvas = JSON.parse(localStorage.getItem('vendas')) || [];

    // 2. Simula o banco de dados de outras entidades (para o JOIN)
    const bancoClientes = [
      { id: 1, nome: "João Silva", email: "joao@email.com" },
      { id: 2, nome: "Maria Oliveira", email: "maria@email.com" },
      { id: 3, nome: "Carlos Souza", email: "carlos@email.com" }
    ];

    const bancoCervejas = [
      { id: 101, nome: "IPA Suprema", estilo: "IPA" },
      { id: 102, nome: "Pilsen Leve", estilo: "Pilsen" },
      { id: 103, nome: "Stout Escura", estilo: "Stout" }
    ];

    // 3. Realizando o JOIN com map() e find()
    const relatorioComJoin = vendasSalvas.map((venda) => {
      // Procura o cliente pelo ID (Chave Estrangeira)
      const clienteEncontrado = bancoClientes.find(c => c.id === venda.clienteId) || { nome: "Cliente Não Encontrado" };
      
      // Procura a cerveja pelo ID (Chave Estrangeira)
      const cervejaEncontrada = bancoCervejas.find(c => c.id === venda.cervejaId) || { nome: "Cerveja Não Encontrada" };

      // Retorna a venda mesclada com os dados reais
      return {
        idVenda: venda.id,
        clienteNome: clienteEncontrado.nome,
        cervejaNome: cervejaEncontrada.nome,
        quantidade: venda.quantidade,
        valorTotal: venda.valorTotal
      };
    });

    setDadosRelatorio(relatorioComJoin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📊 Relatório de Vendas (JOIN)</h2>
        <div>
          <button onClick={() => navigate('/vendas')} style={{ marginRight: '10px', cursor: 'pointer' }}>💰 Ver Vendas</button>
          <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Sair</button>
        </div>
      </div>

      <p>Simulação de JOIN entre Vendas, Clientes e Cervejas.</p>

      {/* Exibição clara do relatório */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>ID Venda</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Cliente</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Cerveja</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Qtd</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Total (R$)</th>
          </tr>
        </thead>
        <tbody>
          {dadosRelatorio.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: '10px', textAlign: 'center' }}>Nenhuma venda encontrada para o relatório.</td>
            </tr>
          ) : (
            dadosRelatorio.map((linha) => (
              <tr key={linha.idVenda}>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{linha.idVenda}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>{linha.clienteNome}</strong></td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{linha.cervejaNome}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{linha.quantidade}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{linha.valorTotal.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Relatorio;