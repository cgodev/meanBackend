/* Ruta: '/api/medicos' */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico,
    getMedicoById
} = require('../controllers/medicos')

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarOperacionAdmin } = require('../middlewares/validar-admin');

const router = Router();
router.get('/', getMedicos);


router.post('/', [
    /* Middlewares */
    validarJWT,
    validarOperacionAdmin,
    check('nombre', `El nombre del medico es necesario`).not().isEmpty(),
    check('hospital', `El id del hospital es necesario`).not().isEmpty(),
    check('hospital', `El id del hospital debe de ser valido`).isMongoId(),
    validarCampos
], createMedico);

router.put('/:id', [
    /* Middlewares */
    validarJWT,
    validarOperacionAdmin,
    check('nombre', `El nombre del medico es necesario`).not().isEmpty(),
    check('hospital', `El id del hospital es necesario`).not().isEmpty(),
    check('hospital', `El id del hospital debe de ser valido`).isMongoId(),
    validarCampos
], updateMedico);

router.delete('/:id', [
    /* Middlewares */
    validarJWT,
    validarOperacionAdmin,
], deleteMedico);

router.get('/:id', [
    /* Middlewares */
    validarJWT,
    validarOperacionAdmin,
], getMedicoById);


module.exports = router;