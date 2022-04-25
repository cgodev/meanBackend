const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const { googleVerify } = require('../helpers/google-verify');
const { JWTGenerator } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        /* Verificar email */
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                message: `Not possible validate this user.`
            })
        }

        /* Verificar contrasena */
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
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
        return res.status(500).json({
            ok: true,
            message: `Error validating user`
        })
    }
}

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const googleUserData = await googleVerify(googleToken)

        const usuarioDB = await Usuario.findOne({ email: googleUserData.email })
        let usuario;
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: googleUserData.name,
                email: googleUserData.email,
                password: 'NA',
                img: googleUserData.picture,
                google: true
            })
        } else {
            //Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = 'NA';
        }

        //Save user
        await usuario.save();
        const token = await JWTGenerator(usuario.id)



        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: true,
            message: 'Invalid token'
        })
    }

}

const renewToken = async (req, res = response) => {


    try {
        const uid = req.uid;
        //Generar el TOKEN JWT
        const token = await JWTGenerator(uid);

        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: `Internal Server error`
        })
    }
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}