import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './pages/Login';
import Clientes from './pages/Clientes';
import Cervejas from './pages/Cervejas';
import Vendas from './pages/Vendas';
import Relatorio from './pages/Relatorio';

function RotaProtegida({ children }) {
  const usuarioLogado =
    localStorage.getItem('usuarioLogado');

  return usuarioLogado
    ? children
    : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirecionamento inicial */}
        <Route
          path="/"
          element={
            localStorage.getItem('usuarioLogado')
              ? <Navigate to="/clientes" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* CRUD Clientes */}
        <Route
          path="/clientes"
          element={
            <RotaProtegida>
              <Clientes />
            </RotaProtegida>
          }
        />

        {/* CRUD Cervejas */}
        <Route
          path="/cervejas"
          element={
            <RotaProtegida>
              <Cervejas />
            </RotaProtegida>
          }
        />

        {/* CRUD Vendas */}
        <Route
          path="/vendas"
          element={
            <RotaProtegida>
              <Vendas />
            </RotaProtegida>
          }
        />

        {/* Relatório JOIN */}
        <Route
          path="/relatorio"
          element={
            <RotaProtegida>
              <Relatorio />
            </RotaProtegida>
          }
        />

        {/* Rota inválida */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;