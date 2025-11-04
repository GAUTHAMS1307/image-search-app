import React from 'react';
import './Login.css';

function Login({ apiUrl }) {
  const handleLogin = (provider) => {
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Image Search App</h1>
        <p>Sign in to search and save images</p>
        
        <div className="login-buttons">
          <button 
            className="login-btn google-btn"
            onClick={() => handleLogin('google')}
          >
            <span className="btn-icon">G</span>
            Sign in with Google
          </button>
          
          <button 
            className="login-btn facebook-btn"
            onClick={() => handleLogin('facebook')}
          >
            <span className="btn-icon">f</span>
            Sign in with Facebook
          </button>
          
          <button 
            className="login-btn github-btn"
            onClick={() => handleLogin('github')}
          >
            <span className="btn-icon">⚈</span>
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
