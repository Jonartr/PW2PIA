const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require("./userRoutes");

const app = express();
const PORT =  3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
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





// Rutas

//Página principal
// app.get('/hi', async (req, res) => {
//     try {
//         const users = await User.find({}).exec();
//         res.send(users);
//     } catch (error) {
//         console.error('Error al obtener los usuarios', error);
//         res.status(500).send('Error al obtener los usuarios');
//     }
// });


app.use("/api/users", userRoutes);

// app.post('/register', async (req, res) => {
//     const { username,email, password, confirm_password } = req.body;

//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//         return res.status(400).json({ message: 'El nombre de usuario ya está en uso' })
//        //document.getElementById('error-message').textContent = "El nombre de usuario ya está en uso";
//     }
//     else{

//         var usernameRegex = new RegExp("[a-zA-Z0-9]{3,}");
//         var passwordRegex = new RegExp("(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}");

//         if(usernameRegex.test(username.value) && username.value != null){

//             if(passwordRegex.test(password) && password === confirm_password){
//                 const newUser = new User({ username, email ,password: password });
//                 await newUser.save();
//                 alert("Usuario registrado correctamente.");
//                 res.sendFile(path.join(__dirname, '../Client/Public/Inicio.html'));
//             }
//             else{
//                 return res.status(400).json({ message: 'La contraseña debe tener minimo 8 caracteres, 1 letra mayuscula, y letra miniscula, 1 numero y un caracter especial.' });
//             }

           
//         }
//         else{
//             return res.status(400).json({ message: 'Nombre solo deben de ser letras y minimo 3 caracteres.' });
//         }

      
//     }
 
// });

// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).send('Error fetching users');
//   }
// });
  
// app.get('/api/hola',async(req,res)=>{
//   res.json({ message: 'Hola Mundo' });
// })

// app.post('/users', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username, password });
//     if (!user) {
//         return res.status(400).json({ message: 'Usuario y/o contraseña incorrectos, revise nuevamente' });
//     }
//     const token = jwt.sign({ loggeduser: user.username }, 'secretkey', { expiresIn: '1h' });

//     console.log('Generated Token:', token); // Verificar el token en el servidor
  
//     res.status(200).json({ token });
// });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

