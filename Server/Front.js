const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
    res.send('<h1>Bienvenido a la aplicación de Login y Registro</h1><p><a href="/login">Login</a> | <a href="/register">Registro</a></p>');
});

// Servir las vistas
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/Public/Login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/Public/Registro.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://127.0.0.1:${PORT}`);
});