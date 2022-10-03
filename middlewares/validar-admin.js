const Usuario = require("../models/usuario");

const validarOperacionAdmin = async (req, res, next) => {

    const uid = req.uid;
    const id = req.params.id


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                message: 'Este usuario no existe'
            })
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                message: 'No estas autorizado para realizar esta operacion'
            })
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: `Error general ${error}`
        })
    }
}

module.exports = {
    validarOperacionAdmin
}