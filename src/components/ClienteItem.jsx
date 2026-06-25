function ClienteItem({ cliente, aoEditar, aoExcluir }) {
  return (
    <li className="list-card client-card">

      <div className="client-info">

        <div className="client-avatar">
          {cliente.nome?.charAt(0).toUpperCase()}
        </div>

        <div className="client-details">
          <strong className="client-name">
            {cliente.nome}
          </strong>

          <small className="client-email">
            {cliente.email}
          </small>

          <small className="client-phone">
            {cliente.telefone || 'Telefone não informado'}
          </small>
        </div>

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
          🗑 Excluir
        </button>

      </div>

    </li>
  );
}

export default ClienteItem;