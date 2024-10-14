import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Image from './img/Ayato.png'
import React, { useState } from 'react';
import axios from 'axios';

const Login  = () => {

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

    return (
       
<section className="bg-primary py-3 py-md-5 py-xl-8">
  <div className="container">
    <div className="row gy-4 align-items-center">
      <div className="col-12 col-md-6 col-xl-7">
        <div className="d-flex justify-content-center text-bg-primary">
          <div className="col-12 col-xl-9">
            <img
              className="img-fluid rounded mb-4"
              loading="lazy"
              src={Image}
              width={245}
              height={80}
              alt="Logo Mangas UwU"
            />
            <h2 className="h1 mb-4">
              Sumérgete en mundos increíbles, un manga a la vez.
            </h2>
            <hr className="border-primary-subtle mb-4" />
            <p className="lead mb-5">Opiniones sinceras, mangas fascinantes.</p>
            <div className="text-endx">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={48}
                fill="currentColor"
                className="bi bi-grip-horizontal"
                viewBox="0 0 16 16"
              >
                <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-xl-5">
        <div className="card border-0 rounded-4">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="row">
              <div className="col-12">
                <div className="mb-4">
                  <h3>Bienvenido de nuevo UwU</h3>
                  <br />
                  <br />
                  <h3>Sign in</h3>
                  <p>
                    No tienes una cuenta?{" "}
                    <a href="/register">Registrate ahora</a>
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleLogin} id="loginForm">
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
            </form>
            <div className="row">
              <div className="col-12">
                <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end mt-4">
                  <a href="ForgotPassword.html">Olvidaste tu contraseña?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        
    );
};

export default Login;
