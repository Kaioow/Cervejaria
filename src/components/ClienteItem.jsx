function ClienteItem({ cliente, aoEditar, aoExcluir }) {
  return (
    <li style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <strong>{cliente.nome}</strong> <br />
        <small>{cliente.email} | {cliente.telefone}</small>
      </div>
      <div>
        <button onClick={() => aoEditar(cliente)} style={{ marginRight: '5px', cursor: 'pointer' }}>✏️ Editar</button>
        <button onClick={() => aoExcluir(cliente.id)} style={{ cursor: 'pointer' }}>🗑️ Excluir</button>
      </div>
    </li>
  );
}

export default ClienteItem;