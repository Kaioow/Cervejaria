import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cervejas from './pages/Cervejas';
import Clientes from './pages/Clientes';
import Vendas from './pages/Vendas';
import Relatorio from './pages/Relatorio'; // <-- Importação do relatório

function RotaProtegida({ children }) {
  const logado = localStorage.getItem('usuarioLogado');
  return logado ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/cervejas" element={<RotaProtegida><Cervejas /></RotaProtegida>} />
        <Route path="/clientes" element={<RotaProtegida><Clientes /></RotaProtegida>} />
        <Route path="/vendas" element={<RotaProtegida><Vendas /></RotaProtegida>} />
        
        {/* Nova rota protegida para o Relatório */}
        <Route path="/relatorio" element={<RotaProtegida><Relatorio /></RotaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;