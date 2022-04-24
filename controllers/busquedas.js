const { response } = require("express")
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const generalSearch = async (req, res = response) => {

    try {
        const query = req.params.query;
        const regex = new RegExp(query, 'i');

        const [usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({
                nombre: regex
            }),
            Medico.find({
                nombre: regex
            }),
            Hospital.find({
                nombre: regex
            })
        ])

        res.status(200).json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: `Internal system error`
        })
    }

}

const getByCollectionMethods = {
    'medicos': async (regex) => {
        return await Medico.find({
            nombre: regex
        })
    },
    'hospitales': async (regex) => {
        return await Hospital.find({
            nombre: regex
        })
    },
    'usuarios': async (regex) => {
        return await Usuario.find({
            nombre: regex
        })
    },
}

const getDocumentsByCollection = async (req, res = response) => {

    try {
        const collection = req.params.collection;
        const query = req.params.query;
        const regex = new RegExp(query, 'i');

        let response =  null;
        getByCollectionMethods.hasOwnProperty(collection)?
            response = await getByCollectionMethods[collection](regex):
            response = null;
        
        if(response === null){
            res.status(400).json({
                ok: false,
                message: `Invalid collection parameter.`
            })
        }
        res.status(200).json({
            ok: true,
            response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: `Internal system error`
        })
    }

}



module.exports = {
    generalSearch,
    getDocumentsByCollection
}