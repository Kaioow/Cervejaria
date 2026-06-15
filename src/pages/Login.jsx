import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    localStorage.setItem('usuarioLogado', 'true');
    navigate('/cervejas');
  };

  return (
    <div className="login-screen-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        /* Força o componente a ocupar a tela inteira, ignorando travas do Vite */
        .login-screen-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #fafafa;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #171717;
          z-index: 99999;
          box-sizing: border-box;
        }

        .login-card {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          padding: 40px;
          border-radius: 12px;
          width: 100%;
          max-width: 360px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          text-align: left; /* Garante alinhamento padrão à esquerda */
        }

        .brand-logo {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 0 0 8px 0;
          color: #0a0a0a;
        }

        .brand-dot {
          color: #d97706;
        }

        .brand-subtitle {
          color: #737373;
          font-size: 14px;
          margin: 0 0 32px 0;
          line-height: 1.5;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
          text-align: left;
        }

        .form-label {
          font-size: 13px;
          font-weight: 500;
          color: #444444;
        }

        .form-input {
          padding: 11px 14px;
          border-radius: 6px;
          border: 1px solid #e5e5e5;
          background-color: #ffffff;
          color: #171717;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          box-sizing: border-box;
          width: 100%;
          transition: all 0.15s ease;
        }

        .form-input:focus {
          border-color: #171717;
          box-shadow: 0 0 0 3px rgba(23, 23, 23, 0.08);
        }

        .form-input::placeholder {
          color: #a3a3a3;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          border-radius: 6px;
          border: none;
          background-color: #171717;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background-color 0.15s ease;
          margin-top: 8px;
        }

        .submit-btn:hover {
          background-color: #262626;
        }

        .footer-text {
          text-align: left;
          margin: 32px 0 0 0;
          font-size: 11px;
          color: #a3a3a3;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background-color: #10b981;
          border-radius: 50%;
        }
      `}</style>

      <div className="login-card">
        <h2 className="brand-logo">
          BrewTech<span className="brand-dot">.</span>
        </h2>
        <p className="brand-subtitle">
          Gerenciamento de produção e fluxo de vendas.
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">E-mail corporativo</label>
            <input 
              type="email" 
              className="form-input"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="nome@brewtech.com"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Senha de acesso</label>
            <input 
              type="password" 
              className="form-input"
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Entrar no painel
          </button>
        </form>
        
        <p className="footer-text">
          <span className="status-dot"></span> Todos os sistemas operacionais
        </p>
      </div>
    </div>
  );
}

export default Login;