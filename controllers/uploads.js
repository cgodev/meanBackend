const path = require('path');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/updateImages");
const fs = require('fs');


const fileUpload = async (req, res = response) => {

    try {
        const tipo = req.params.tipo;
        const uid = req.params.id;

        if (!validUploadType.hasOwnProperty(tipo)) {
            res.status(400).json({
                ok: false,
                message: `El tipo seleccionado no es valido`
            })
        }

        if(!req.files || Object.keys(req.files).length === 0){
            res.status(400).json({
                ok: false,
                message: `No se cargo ningun archivo.`
            })
        }

        //Procesar la imagen
        const file = req.files.imagen;
        const nombreCortado = file.name.split('.');
        const fileExtension = nombreCortado[nombreCortado.length - 1];

        //Validar extension
        if(!validExtensions.hasOwnProperty(fileExtension)){
            res.status(400).json({
                ok: false,
                message: `Archivo no valido`
            })
        }

        //Generar el nombre del archivo
        const fileName = `${ uuidv4() }.${fileExtension}`

        //Path de la imagen
        const path = `./uploads/${tipo}/${fileName}`;

        file.mv(path, (err) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    message: `error moving image`
                })
            }

            //update database
            updateImage(tipo, uid, fileName);
            res.json({
                ok: true,
                message: `File upload ok`,
                fileName
            })
        })

        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: `unhandledError on fileupload`
        })
    }

}

const fetchImage = async (req, res = response) => {
    const tipo = req.params.tipo;
    const imagen = req.params.path;

    const pathImage = path.join(__dirname, `../uploads/${tipo}/${imagen}`);
    //imagen por defecto
    if( fs.existsSync( pathImage ) ){
        res.sendFile( pathImage );
    }else{
        const pathImage = path.join(__dirname, `../uploads/no-img.png`);
        res.sendFile( pathImage );
    }
}

const validUploadType = {
    hospitales: 'hospitales',
    medicos: 'medicos',
    usuarios: 'usuarios',
}

const validExtensions = {
    png: 'png',
    jpg: 'jpg',
    jpeg: 'jpeg',
    gif: 'gif',
}

module.exports = {
    fileUpload,
    fetchImage
}