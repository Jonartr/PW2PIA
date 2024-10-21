const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require("./userRoutes");

const app = express();
const PORT =  3001;

// Middleware
app.use(bodyParser.json());
app.use(express.json({ limit: '100mb' }));
// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/PW2', {
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
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('Si', UserSchema);

app.get('/api/hola',async(req,res)=>{
  res.json({ message: 'Hola Mundo' });
})

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

