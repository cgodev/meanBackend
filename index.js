require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');
/* Create express server */
const app = express();

/* Config cors */
//Use es usado para middlewares!!

app.use(cors());

/* Lectura y parseo del body */
app.use(express.json());

/* Conexion a la base de datos */
dbConnection();

//Directorio Publico
app.use(express.static('public'));

/* Routes */

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));




app.listen( process.env.PORT, () => {
    console.log(`Server up in port 3001`);
} )