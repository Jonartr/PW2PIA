import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

const Formlogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const url = "http://localhost:3001/users";

    const handleLogin = async (e) => {
        e.preventDefault();
        //console.log(username + " " + password);
        try {
            const response = await Axios.post(url, { username, password });
            //  const user = JSON.stringify(response.data);
            setUsername(response.data.username);
            // alert(response.data.username);
            Cookies.set('Username', response.data.username);
            Cookies.set('photo', response.data.profilePhoto)
            window.location.replace('http://localhost:3000/');
            console.log(response);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="username" className="form-label">Correo electrónico/Usuario</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password" className="form-label">Contraseña</label>
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
    );
}

export default Formlogin;
