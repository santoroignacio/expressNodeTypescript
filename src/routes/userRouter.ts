import express from 'express';
const router = express.Router()
import { formularioUsuario, registrarUsuario, formularioLogin, loginUsuario,logoutUsuario, pruebaToken, listarUsuarios, eliminarUsuario, formularioActualizar,actualizarUsuario } from '../controllers/userController';
import { check } from 'express-validator';
//import verifyToken from '../services/verifyToken.js';

router.get('/registrar', formularioUsuario);
router.post('/registrar', [
    check('nombreUsuario').notEmpty().isString().isLength({ min: 8 }),
    check('emailUsuario').notEmpty().isEmail(),
    check('passwordUsuario').notEmpty()],
    registrarUsuario);

router.get('/login', formularioLogin)
router.post('/login', [
    check('emailUsuario').notEmpty().isEmail(),
    check('passwordUsuario').notEmpty()],
    loginUsuario)

router.get('/admin'/* ,verifyToken */, pruebaToken)    
router.get('/listar', listarUsuarios);
router.post('/eliminar/:_id', eliminarUsuario)
router.get('/actualizar/:_id', formularioActualizar)
router.post('/actualizar/:_id', actualizarUsuario)
router.post('/logout', logoutUsuario)


export default router



