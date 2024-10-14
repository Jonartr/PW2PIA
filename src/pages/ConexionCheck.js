import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ConexionDisconnect from  './ConexionDisconnect';

import axios from 'axios';
const CheckConnection = () => { 
    const [data, setData] = useState(null);

    useEffect(() => { const fetchData = async () => { 
        try { 
            const response = await axios({
            method: "GET",
            url: "http://127.0.0.1:3003/connect",
            });
            console.log(response.data);
            if(response.data.status != 'fail'){
                setData(response.data);
            }
            else{
                setData(JSON.stringify(response.data));
                alert(JSON.stringify(response.data));
            }
            const backendHtmlString = await response.data;
            console.log(backendHtmlString)
            return {__html: backendHtmlString};
        } catch (error) { 
            console.error(error);
        }
    }; 
fetchData()
}, []);

function createMarkup() {
    return {__html: data};
}
 
return ( 
    <div> 
        <div><h3 style={{color: "red"}}>Este es el componente hijo del componente 'Conexion'. Esta es la vista texto de la peticion '/connect' al WebService Express</h3></div>
        <br></br>
        {data ? ( <p>{data}</p> ) : ( <p>Loading data...</p> )}
        <br></br>
        <br></br>
        <br></br>
        <div><h3 style={{color: "red"}}>Este es el componente hijo del componente 'Conexion'. Esta es la vista HTML de la peticion '/connect' al WebService Express</h3></div>
        <br></br>
        <div dangerouslySetInnerHTML={createMarkup()} />;
        <div><h3 style={{color: "red"}}>Peticion de desconexion a MySQL</h3></div>
            <Link to="/ConexionDisconnect" class="col-2">Desconexion BD</Link>
    </div>
  );
};

export default CheckConnection;