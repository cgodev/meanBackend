const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {
    try {
        const medicos = await Medico.find()
            .populate('user', 'nombre')
            .populate('hospital', 'nombre')
        res.status(200).json({
            ok: true,
            medicos
        })

    } catch (error) {
        console.log(error);
    }
}

const createMedico = async (req, res = response) => {
    const uid = req.uid;
    const medicoDB = new Medico( {
        user: uid,
        ...req.body
    } );
    
    try {
        await medicoDB.save();

        res.status(200).json({
            ok: true,
            medico: medicoDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error no handled'
        })
    }
}

const updateMedico = (req, res = response) => {
    res.json({
        ok: true,
        message: 'updateMedico'
    })
}

const deleteMedico = (req, res = response) => {
    res.json({
        ok: true,
        message: 'deleteMedico'
    })
}

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}