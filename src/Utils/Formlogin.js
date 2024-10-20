import React, { useState } from 'react';
import axios from 'axios';


const Formlogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      
      try {
          const response = await axios.post('/users', { username, password });
          if (response.data.success) {
              
          } else {
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
        }
    };

    return ( <form onSubmit={handleLogin} id="loginForm">
        <div className="row gy-3 overflow-hidden">
          <div className="col-12">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                placeholder="name@example.com"
                required=""
              />
              <label htmlFor="text" className="form-label">
                Correo electrónico/Usuario
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                defaultValue=""
                placeholder="Password"
                required=""
              />
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="d-grid">
              <button className="btn btn-primary btn-lg" type="submit">
                Entrar
              </button>
            </div>
          </div>
        </div>
      </form>);
}

export default Formlogin;