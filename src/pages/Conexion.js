import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState(null);

  const url = "http://localhost:3000/users"; // Asegúrate de que este URL sea correcto en tu entorno

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Si');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ color: "red" }}>
        Este es el componente padre 'Conexion'. Esta es la vista texto de la peticion '/' al WebService Express
      </h2>
      <br />
      {data ? (
        data.map((user, index) => (
          <p key={index}>
            {user.username} - {user.email}
          </p>
        ))
      ) : (
        <p>Loading data...</p>
      )}
      <br />
      <br />
      <br />
      <h2 style={{ color: "red" }}>
        Este es el componente padre 'Conexion'. Esta es la vista HTML de la peticion '/' al WebService Express
      </h2>
      <br />
      <br />
      <br />
    </div>
  );
};

export default MyComponent;
