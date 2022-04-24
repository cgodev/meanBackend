const { response } = require("express")
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

const updateHospital = (req, res = response) => {
    res.json({
        ok: true,
        message: 'updateHospital'
    })
}

const deleteHospital = (req, res = response) => {
    res.json({
        ok: true,
        message: 'deleteHospital'
    })
}

module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}