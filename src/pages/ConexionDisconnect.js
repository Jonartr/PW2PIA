import React, { useEffect, useState } from 'react';

import axios from 'axios';
const Disconnect = () => { 
    const [data, setData] = useState(null);

    useEffect(() => { const fetchData = async () => { 
        try { 
            const response = await axios({
            method: "GET",
            url: "http://127.0.0.1:3003/disconnect",
            });
            console.log(response.data);
            setData(response.data);
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
        <div><h3 style={{color: "red"}}>Este es el componente hijo del componente 'ConexionCheck'. Esta es la vista texto de la peticion '/disconnect' al WebService Express</h3></div>
        <br></br>
        {data ? ( <p>{data}</p> ) : ( <p>Loading data...</p> )}
        <br></br>
        <br></br>
        <br></br>
        <div><h3 style={{color: "red"}}>Este es el componente hijo del componente 'ConexionCheck'. Esta es la vista HTML de la peticion '/disconnect' al WebService Express</h3></div>
        <br></br>
        <div dangerouslySetInnerHTML={createMarkup()} />;
    </div>
  );
};

export default Disconnect;