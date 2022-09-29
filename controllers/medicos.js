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

const updateMedico = async(req, res = response) => {

    try {
        const uid = req.uid;
        const medicoId = req.params.id

        const medicoDB = await Medico.findById(medicoId)

        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                message: 'Medico not found'
            })
        }

        const medicoUpdate = {
            ...req.body,
            user: uid
        }
        const medicoUpdated = await Medico.findByIdAndUpdate(medicoId, medicoUpdate, { new: true })
        

        res.status(200).json({
            ok: true,
            medico: medicoUpdated
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: `Unhandled Error`
        })
    }
    
}

const deleteMedico = async(req, res = response) => {

    try {
        
        const medicoId = req.params.id
        const medicoDB = await Medico.findById(medicoId)

        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                message: 'Medico not found'
            })
        }

        
        await Medico.findByIdAndDelete(medicoId);
        

        res.status(200).json({
            ok: true,
            message: 'Medico deleted'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: `Unhandled Error`
        })
    }
}

const getMedicoById = async (req, res = response) => {
    try {
        
        const medicoId = req.params.id
        const medicoDB = await Medico.findById(medicoId)
                                        .populate('user', '_id nombre img')
                                        .populate('hospital', '_id nombre img')

        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                message: 'Medico not found'
            })
        }

        res.status(200).json({
            ok: true,
            medico: medicoDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: `Unhandled Error`
        })
    }
}

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico,
    getMedicoById
}