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

const router = Router();
router.get('/', getHospitales);


router.post('/', [
    /* Middlewares */
    validarJWT,
    check('nombre', `El nombre del hospital es necesario`).not().isEmpty(),
    validarCampos

], createHospital);

router.put('/:id', [
    /* Middlewares */

], updateHospital);

router.delete('/:id', [
    /* Middlewares */

], deleteHospital);


module.exports = router;