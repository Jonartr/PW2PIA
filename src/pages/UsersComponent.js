// UsersComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado

const UsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a tu API para obtener los usuarios
    axios.get('http://127.0.0.1:3000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersComponent;
