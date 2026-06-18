import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  //ambos os valores vão ser setados nessa mesma pagina nos inputs
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  //obtem função que permite navegar entre paginas
  const navigate = useNavigate();

  const handleLogin = (e) => {
    //manter o usuario logado
    e.preventDefault();

    //testa se algum campo está nulo
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    localStorage.setItem('usuarioLogado', 'true');
    //passa a pagina pro navigate
    navigate('/clientes');
  };

  return (
    <div className="login-screen-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .login-screen-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;

          background: linear-gradient(
            135deg,
            #e98008,
            #e8c216
          );

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
          padding: 40px;
          border-radius: 16px;

          width: 100%;
          max-width: 420px;

          border-top: 5px solid #d97706;

          box-shadow:
            0 10px 25px rgba(0,0,0,.15);

          text-align: left;
        }

        .brand-logo {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 0 0 10px 0;
          color: #1f2937;
          text-align: center;
        }

        .brand-subtitle {
          color: #6b7280;
          font-size: 14px;
          margin: 0 0 32px 0;
          line-height: 1.5;
          text-align: center;
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
          font-weight: 600;
          color: #374151;
        }

        .form-input {
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          background-color: #ffffff;
          color: #171717;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          box-sizing: border-box;
          width: 100%;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          border-color: #d97706;
          box-shadow: 0 0 0 3px rgba(217,119,6,.15);
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;

          background-color: #d97706;
          color: #ffffff;

          font-size: 14px;
          font-weight: 600;
          font-family: inherit;

          cursor: pointer;
          transition: all .2s ease;

          margin-top: 8px;
        }

        .submit-btn:hover {
          background-color: #b45309;
        }

        .footer-text {
          text-align: center;
          margin: 25px 0 0 0;
          font-size: 12px;
          color: #9ca3af;
        }
      `}</style>

      <div className="login-card">

        <h2 className="brand-logo">
          🍺 NossaBreja
        </h2>

        <p className="brand-subtitle">
          Sistema de Gestão para Cervejarias
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Senha
            </label>

            <input
              type="password"
              className="form-input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Entrar no Sistema
          </button>
        </form>

        <p className="footer-text">
          NossaBreja v1.0 • Projeto Acadêmico
        </p>

      </div>
    </div>
  );
}

export default Login;