const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors")
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const axios = require ('axios');


//MODELOS
const Comments = require('./Models/Comments');
const User = require('./Models/Users');

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




//======================APARTADO DE REFERENTE A COMENTARIOS =============================//
app.post('/Comment', async (req, res) => {
  const { nombre, comentario,rating, idmanga } = req.body;
  const idcomment = await Comments.countDocuments() + 1;
  const date = Date.now();

  const newComment = new Comments({
    idcomment: idcomment,
    iduser: nombre,
    idmanga: idmanga,
    message: comentario,
    rating: rating,
    date: date
  });

  try {
    await newComment.save();
    return res.status(201).json({ message: 'Comentario realizado', status: true });
  } catch (error) {
    console.error('Error guardando el comentario:', error);
    return res.status(500).json({ message: 'Error guardando el comentario', status: false });
  }



})

app.get('/Comment', async (req, res) => {

  const { idmanga, order } = req.query;
  try {
    const comments = await Comments.find({ idmanga: idmanga }).sort({ date: order === 'asc' ? 1 : -1 });
    return res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'Error fetching comments', status: false });
  }

})


app.get('/latestComment', async (req, res) => {
  try {
    const comments = await Comments.find().sort({ date: -1 }).limit(3);
    const mangaDetailsPromises = comments.map(async (comment) => {
      const mangaResponse = await axios.get(`https://api.mangadex.org/manga/${comment.idmanga}`);
      const mangaTitle = mangaResponse.data.data.attributes.title.en || mangaResponse.data.data.attributes.title.jp || 'Título desconocido';
      return {
        ...comment._doc,
        mangaTitle
      };
    });
    const commentsWithMangaTitles = await Promise.all(mangaDetailsPromises);
    return res.status(200).json(commentsWithMangaTitles);
  } catch (error) {
    console.error('Error fetching latest comments:', error);
    return res.status(500).json({ message: 'Error fetching latest comments', status: false });
  }
});



//======================APARTADO DE REFERENTE A USUARIOS =============================//
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

