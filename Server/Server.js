const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/PW2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos');
}).catch(err => {
    console.error('Error al conectar a la base de datos', err);
});

// Modelo de Usuario
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('Si', UserSchema);

// Rutas

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/Public/Inicio.html'));
});

// Servir las vistas
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/Public/Login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/Public/Registro.html'));
});


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('El nombre de usuario ya está en uso');
    }
  //  const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: password });
    await newUser.save();
    res.sendFile(path.join(__dirname, '../Client/Public/Home.html'));
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('Usuario no encontrado');
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //     return res.status(400).send('Contraseña incorrecta');
    // }
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://127.0.0.1:${PORT}`);
});


