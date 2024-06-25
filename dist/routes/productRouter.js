"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const productController_1 = require("../controllers/productController");
//import  verifyToken  from '../services/verifyToken.js';
router.get('/', productController_1.mostrarProducto);
router.post('/', productController_1.cargarProducto);
router.get('/listar', productController_1.listarProductos);
router.get('/listarCard', productController_1.listarCard);
router.get('/cards/:_id', productController_1.descripcionProducto);
router.post('/eliminar/:_id', productController_1.eliminarProducto);
router.get('/actualizar/:_id', productController_1.formularioActualizar);
router.post('/actualizar/:_id', productController_1.actualizarProducto);
exports.default = router;
//# sourceMappingURL=productRouter.js.map