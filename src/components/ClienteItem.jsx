function ClienteItem({ cliente, aoEditar, aoExcluir }) {
  return (
    <li className="list-card">
      <div>
        <strong>{cliente.nome}</strong>

        <br />

        <small>
          {cliente.email}
        </small>

        <br />

        <small>
          {cliente.telefone || 'Telefone não informado'}
        </small>
      </div>

      <div className="actions">
        <button
          className="primary-btn"
          onClick={() => aoEditar(cliente)}
        >
          ✏️ Editar
        </button>

        <button
          className="danger-btn"
          onClick={() => aoExcluir(cliente.id)}
        >
          🗑️ Excluir
        </button>
      </div>
    </li>
  );
}

export default ClienteItem;