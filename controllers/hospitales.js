const { response } = require("express");
const hospital = require("../models/hospital");
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    try {
        const hospitales = await Hospital.find()
            .populate('user', 'nombre')
        res.status(200).json({
            ok: true,
            hospitales
        })

    } catch (error) {
        console.log(error);
    }

}

const createHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospitalDB = new Hospital({
        user: uid,
        ...req.body
    });

    try {
        await hospitalDB.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error no handled'
        })
    }

}

const updateHospital = async (req, res = response) => {

    const hospitalId = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById(hospitalId);

        if(!hospitalDB){
            return res.status(404).json({
                ok: true,
                message: 'Hospital no encontrado'
            })
        }
        const cambiosHospital = {
            ...req.body,
            user: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, {new: true });

        res.status(200).json({
            ok: true,
            hospital: hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            message: 'Error Updating hospital'
        })
    }
    
}

const deleteHospital = async (req, res = response) => {
    const hospitalId = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(hospitalId);

        if(!hospitalDB){
            return res.status(404).json({
                ok: true,
                message: 'Hospital no encontrado'
            })
        }
        

        await Hospital.findByIdAndDelete(hospitalId);

        res.status(200).json({
            ok: true,
            message: `Hospital Eliminado`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            message: 'Error Updating hospital'
        })
    }
}

module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}