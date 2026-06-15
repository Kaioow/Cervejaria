import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        🍺 BeerManager
      </div>

      <nav className="sidebar-menu">

        <NavLink
          to="/clientes"
          className="sidebar-link"
        >
          👥 Clientes
        </NavLink>

        <NavLink
          to="/cervejas"
          className="sidebar-link"
        >
          🍻 Cervejas
        </NavLink>

        <NavLink
          to="/vendas"
          className="sidebar-link"
        >
          💰 Vendas
        </NavLink>

        <NavLink
          to="/relatorio"
          className="sidebar-link"
        >
          📊 Relatório
        </NavLink>

      </nav>

      <button
        className="danger-btn sidebar-logout"
        onClick={logout}
      >
        🚪 Sair
      </button>

    </aside>
  );
}

export default Sidebar;