import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validação de campos obrigatórios
    if (!email || !senha) {
      alert('Por favor, preencha o e-mail e a senha!');
      return;
    }

    // Controle de sessão no localStorage
    localStorage.setItem('usuarioLogado', 'true');
    navigate('/cervejas');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🍺 Login - Cervejaria</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto', gap: '10px' }}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Digite seu e-mail"
        />
        <input 
          type="password" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          placeholder="Digite sua senha"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;