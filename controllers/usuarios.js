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

    //Se extrae el id de los params...
    const uid = req.params.id;

    try {
        //Se bsuca un usuario con este id
        const usuarioDB = await Usuario.findById(uid);
        //Si no existe retornamos 303
        if (!usuarioDB) {
            return res.status(303).json({
                ok: false,
                msg: `No existe un usuario por este id`
            })
        }

        //Extraccion de la data a actualizar del body...
        const { password, google, email, ...campos } = req.body;
        console.log(`Campos: ${JSON.stringify(campos)}`);

        //Si el usuario existe y requiere cambio de correo
        //Validamos que no haya otro usuario con el mismo correo
        //Caso contrario retornamos 400

        if (usuarioDB.email !== req.body.email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    message: `Ya existe un usuario con este correo`
                })
            }
        }

        //Si el usuario es de google asignamos el email como campo a actualizar...
        if(usuarioDB.google){
            return res.status(400).json({
                ok: false,
                msg: 'Usuarios de google no pueden cambiar su correo'
            })
        }else if(usuarioDB.email !== email){
            campos.email = email;
        }

        
        
        const usuarioUpdated = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        return res.status(200).json({
            ok: true,
            msg: `Usuario actualizado correctamente.`,
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