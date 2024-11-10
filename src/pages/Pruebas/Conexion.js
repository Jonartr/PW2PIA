import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const url = "http://localhost:3001/api/users";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(url);
        console.log(response.data);
        const info = JSON.stringify(response.data);
        console.log(info);

        if (info.ok == 'fail') {
          throw new Error('Network response was not ok');
        }
        else{
          JSON.parse(info);
          setData(info);
          console.log(info.username);
        }


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
        <p >{data}</p>
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
