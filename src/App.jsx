import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Cervejaria - Tela de Login em breve</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;