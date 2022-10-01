/* Ruta: '/api/hospitales' */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitales')

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarOperacionAdmin } = require('../middlewares/validar-admin');

const router = Router();
router.get('/', getHospitales);


router.post('/', [
    /* Middlewares */
    validarJWT,
    validarOperacionAdmin,
    check('nombre', `El nombre del hospital es necesario`).not().isEmpty(),
    validarCampos

], createHospital);

router.put('/:id', [
    /* Middlewares */
    validarJWT,
    validarOperacionAdmin,
    check('nombre', `El nombre del hospital es necesario`).not().isEmpty(),
    validarCampos
], updateHospital);

router.delete('/:id', [
    /* Middlewares */
    validarJWT,
    validarOperacionAdmin,
], deleteHospital);


module.exports = router;