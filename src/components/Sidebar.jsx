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
        🍺 NossaBreja
      </div>

      <nav className="sidebar-menu">

        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon">👥</span>
          Clientes
        </NavLink>

        <NavLink
          to="/cervejas"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon">🍻</span>
          Cervejas
        </NavLink>

        <NavLink
          to="/vendas"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon">💰</span>
          Vendas
        </NavLink>

        <NavLink
          to="/relatorio"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon">📊</span>
          Relatório
        </NavLink>

      </nav>

      <button
        className="danger-btn sidebar-logout"
        onClick={logout}
      >
        ⏻ Sair
      </button>

    </aside>
  );
}

export default Sidebar;