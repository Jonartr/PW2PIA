import React, { useState } from 'react';
import Axios from 'axios';

const Formregister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirm_password, setConfirm] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    const url = "http://localhost:3001/register";

    const handleRegister = async (e) => {
        e.preventDefault();
        //   console.log(username + " " + password + " " + email + " " + confirm_password);
        console.log(profilePhoto);

        const formData = new FormData();

        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('confirm_password', confirm_password);
        if (profilePhoto) {
            formData.append('profile_photo', profilePhoto);
        }

        try {
            const response = await Axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response)
            if (response.data.status) {
                alert("Registrado con exito");
                console.log(response.data.message);
            } else {
                console.log(response.data.message);
                alert("Error al registrar");
            }
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <form onSubmit={handleRegister} method="POST">
            <div className="row gy-3 overflow-hidden">
                <div className="col-12">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="username" className="form-label">
                            Nombre de usuario
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email" className="form-label">
                            Correo electrónico
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
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="Confirmar contraseña"
                            value={confirm_password}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                        />
                        <label htmlFor="confirm_password" className="form-label">
                            Confirmar contraseña
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-3">
                        <label htmlFor="profile_photo" className="form-label">
                            Foto de perfil
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            name="profile_photo"
                            id="profile_photo"
                            accept="image/*"
                            onChange={(e) => setProfilePhoto(e.target.files[0])}
                        />
                    </div>
                    <div className="col-12">
                        <div className="d-grid">
                            <button className="btn btn-primary btn-lg" type="submit">
                                Registrarse
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    id="error-message"
                    name="error-message"
                    style={{ color: "red" }}
                />
            </div>
        </form>
    );
}

export default Formregister;
