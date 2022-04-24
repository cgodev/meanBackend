/* Ruta: '/api/uploads' */

const { Router } = require('express');
const expressFileUpload = require('express-fileupload')



const { validarJWT } = require('../middlewares/validar-jwt');
const { generalSearch, getDocumentsByCollection } = require('../controllers/busquedas');
const { fileUpload, fetchImage } = require('../controllers/uploads');
const { append } = require('express/lib/response');

const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:path', fetchImage);



module.exports = router;