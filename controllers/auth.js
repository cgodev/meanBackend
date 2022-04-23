const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const { JWTGenerator } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        /* Verificar email */
        const usuarioDB = await Usuario.findOne({email});
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                message: `Not possible validate this user.`
            })
        }

        /* Verificar contrasena */
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if(!validPassword){
            return response.status(400).json({
                ok: false,
                message: `Invalid password`
            })
        }

        /* JWT */

        const token = await JWTGenerator(usuarioDB.id);

        
        return res.status(200).json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login
}