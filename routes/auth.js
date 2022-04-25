const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/* 
    Path: 'api/login'
*/
const router = Router();


router.post('/',
    [
        /* Middlewares */
        check('email', 'El email es obligatorio').isEmail(),
        check('password', `El password es obligatorio`).not().isEmpty(),
        validarCampos
    ],
    login
)

router.post('/google',
    [
        /* Middlewares */
        check('token', `Google token not provided`).not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)

router.get('/renew',
    [
        validarJWT
    ],
    renewToken
)



module.exports = router;