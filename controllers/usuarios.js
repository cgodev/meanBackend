const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const { JWTGenerator } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ])
    res.status(200).json({
        ok: true,
        usuarios,
        total
    })
}

const createUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    try {


        const userExist = await Usuario.findOne({
            email
        });

        if (userExist) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario ya esta registrado`
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        const token = await JWTGenerator(usuario.id);
        res.status(200).json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Error inesperado, revisar logs...`
        })
    }



}

const updateUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(303).json({
                ok: false,
                msg: `No existe un usuario por este id`
            })
        }


        //TODO: Validar token y comprobar si el usuario es correcto.

        //Update
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== req.body.email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    message: `Ya existe un usuario con este correo`
                })
            }
        }

        campos.email = email;
        const usuarioUpdated = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        return res.json({
            ok: true,
            usuario: usuarioUpdated
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: `Unhandled error!!`
        })
    }
}

const deleteUsuario = async (req, res = response) => {

    try {

        const uid = req.params.id;

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(303).json({
                ok: false,
                msg: `No existe un usuario por este id`
            })
        }

        await Usuario.findByIdAndDelete(uid)

        return res.status(200).json({
            ok: true,
            message: `Usuario eliminado`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: `Error no controlado`
        })
    }
}

module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}