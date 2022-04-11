require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');
/* Create express server */
const app = express();

/* Config cors */
//Use es usado para middlewares!!

app.use(cors());

/* Conexion a la base de datos */
dbConnection();

/* Routes */

app.get( '/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: `Hola mundo`
    })
});


app.listen( process.env.PORT, () => {
    console.log(`Server up in port 3001`);
} )