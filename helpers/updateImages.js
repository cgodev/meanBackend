const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fs = require('fs');

const deleteImagen = (path) => {
    if (fs.existsSync(path)) {
        //Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const updateImage = async (type, uid, fileName) => {
    let oldPath = '';
    switch (type) {
        case 'medicos':
            const medico = await Medico.findById(uid)
            if (!medico) {
                console.log('No es un medico');
                return false;
            }
            oldPath = `./uploads/medicos/${medico.img}`;
            deleteImagen(oldPath);

            medico.img = fileName;
            await medico.save();
            return true;
        case 'hospitales':
            const hospital = await Hospital.findById(uid)
            if (!hospital) {
                console.log('No es un hospital');
                return false;
            }
            oldPath = `./uploads/hospitales/${hospital.img}`;
            deleteImagen(oldPath);

            hospital.img = fileName;
            await hospital.save()
            console.log(`Actualice`);
            return true;
        case 'usuarios':
            const usuario = await Usuario.findById(uid)
            if (!usuario) {
                console.log('No es un usuario');
                return false;
            }
            oldPath = `./uploads/usuarios/${usuario.img}`;
            deleteImagen(oldPath);

            usuario.img = fileName;
            await usuario.save()
            return true;
        default: 'Oops!!'
    }


}

module.exports = {
    updateImage
}