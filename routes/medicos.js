/* Ruta: '/api/medicos' */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
} = require('../controllers/medicos')

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', getMedicos);


router.post('/', [
    /* Middlewares */
    validarJWT,
    check('nombre', `El nombre del medico es necesario`).not().isEmpty(),
    check('hospital', `El id del hospital es necesario`).not().isEmpty(),
    check('hospital', `El id del hospital debe de ser valido`).isMongoId(),
    validarCampos
], createMedico);

router.put('/:id', [
    /* Middlewares */
    validarJWT,
    check('nombre', `El nombre del medico es necesario`).not().isEmpty(),
    check('hospital', `El id del hospital es necesario`).not().isEmpty(),
    check('hospital', `El id del hospital debe de ser valido`).isMongoId(),
    validarCampos
], updateMedico);

router.delete('/:id', [
    /* Middlewares */
    validarJWT,
], deleteMedico);


module.exports = router;