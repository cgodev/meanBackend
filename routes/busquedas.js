/* Ruta: '/api/todo' */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');


const { validarJWT } = require('../middlewares/validar-jwt');
const { generalSearch, getDocumentsByCollection } = require('../controllers/busquedas');

const router = Router();
router.get('/:query', validarJWT, generalSearch);
router.get('/collection/:collection/:query', validarJWT, getDocumentsByCollection);


module.exports = router;