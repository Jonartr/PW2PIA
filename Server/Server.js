const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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
    email: {type: String, required:true},
    password: { type: String, required: true },
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

app.get('/recomended', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/Public/Recomendaciones.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/Public/About.html'));
});



app.post('/register', async (req, res) => {
    const { username,email, password, confirm_password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' })
       //document.getElementById('error-message').textContent = "El nombre de usuario ya está en uso";
    }
    else{

        var usernameRegex = new RegExp("[a-zA-Z0-9]{3,}");
        var passwordRegex = new RegExp("(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}");

        if(usernameRegex.test(username.value) && username.value != null){

            if(passwordRegex.test(password) && password === confirm_password){
                const newUser = new User({ username, email ,password: password });
                await newUser.save();
                alert("Usuario registrado correctamente.");
                res.sendFile(path.join(__dirname, '../Client/Public/Inicio.html'));
            }
            else{
                return res.status(400).json({ message: 'La contraseña debe tener minimo 8 caracteres, 1 letra mayuscula, y letra miniscula, 1 numero y un caracter especial.' });
            }

           
        }
        else{
            return res.status(400).json({ message: 'Nombre solo deben de ser letras y minimo 3 caracteres.' });
        }

      
    }
 
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
        return res.status(400).json({ message: 'Usuario y/o contraseña incorrectos, revise nuevamente' });
    }
    const token = jwt.sign({ loggeduser: user.username }, 'secretkey', { expiresIn: '1h' });

    console.log('Generated Token:', token); // Verificar el token en el servidor
  
    res.status(200).json({ token });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://127.0.0.1:${PORT}`);
});


