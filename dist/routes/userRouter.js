"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const express_validator_1 = require("express-validator");
//import verifyToken from '../services/verifyToken.js';
router.get('/registrar', userController_1.formularioUsuario);
router.post('/registrar', [
    (0, express_validator_1.check)('nombreUsuario').notEmpty().isString().isLength({ min: 8 }),
    (0, express_validator_1.check)('emailUsuario').notEmpty().isEmail(),
    (0, express_validator_1.check)('passwordUsuario').notEmpty()
], userController_1.registrarUsuario);
router.get('/login', userController_1.formularioLogin);
router.post('/login', [
    (0, express_validator_1.check)('emailUsuario').notEmpty().isEmail(),
    (0, express_validator_1.check)('passwordUsuario').notEmpty()
], userController_1.loginUsuario);
router.get('/admin' /* ,verifyToken */, userController_1.pruebaToken);
router.get('/listar', userController_1.listarUsuarios);
router.post('/eliminar/:_id', userController_1.eliminarUsuario);
router.get('/actualizar/:_id', userController_1.formularioActualizar);
router.post('/actualizar/:_id', userController_1.actualizarUsuario);
router.post('/logout', userController_1.logoutUsuario);
exports.default = router;
//# sourceMappingURL=userRouter.js.map