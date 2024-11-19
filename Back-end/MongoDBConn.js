const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors")
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3001;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Back-end/images');
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  }

});
const upload = multer({ storage });

// Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('./Back-end/images', express.static('./Back-end/images'));

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
  profilePhoto: { type: String, default: null },
});

// Modelo de comentarios
const CommentsSchema = new mongoose.Schema({
  idcomment: { type: Number, required: true, unique: true },
  iduser: { type: String, required: true },
  idmanga: { type: Number, required: true },
  message: { type: String, required: true},
  date:{type: Date, required: true }
});

const User = mongoose.model('Si', UserSchema);

const Comments = mongoose.model('Comments', CommentsSchema);

app.get('/', async (req, res) => {


})

app.get('/Comment', async (req, res) => {
  const idcomment = 4;
  const iduser = "Jonatr";
  const idmanga = 1
  const date = Date.now();
  const message = 'Hola';

  const newComment = new Comments ({  idcomment: idcomment, iduser: iduser, idmanga: idmanga, message: message, date: date});
  console.log(newComment);
  await newComment.save();
  return res.status(201).json({ message: 'Comentario realizado', status: true });
  

})


app.post('/register', upload.single('profile_photo'), async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
  } else {
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (usernameRegex.test(username)) {
      if (passwordRegex.test(password) && password === confirm_password) {
        //  const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: password, profilePhoto: req.file ? `Back-end/images/${req.file.filename}` : null });
        console.log(newUser);
        await newUser.save();
        return res.status(201).json({ message: 'Usuario registrado correctamente', status: true });
      } else {
        return res.status(400).json({
          message: 'La contraseña debe tener mínimo 8 caracteres, 1 letra mayúscula, 1 letra minúscula, 1 número y 1 carácter especial.',
          status: false
        });
      }
    } else {
      return res.status(400).json({
        message: 'El nombre de usuario solo debe contener letras y números y tener al menos 3 caracteres.',
        status: false
      });
    }
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

app.get('/api/users/hola', async (req, res) => {
  res.json({ message: 'Hola Mundo' });
})

app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(400).json({ message: 'Usuario y/o contraseña incorrectos, revise nuevamente' });
  }

  res.status(200).json({ username: user.username, profilePhoto: user.profilePhoto });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

