"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarProducto = exports.formularioActualizar = exports.eliminarProducto = exports.descripcionProducto = exports.listarCard = exports.listarProductos = exports.cargarProducto = exports.mostrarProducto = void 0;
const productModels_1 = __importDefault(require("../models/productModels"));
const express_1 = require("express");
//import verifyToken from '../services/verifyToken.js';
//import jwt from 'jsonwebtoken';
const mostrarProducto = (req = express_1.request, res = express_1.response) => {
    res.render('producto');
};
exports.mostrarProducto = mostrarProducto;
const cargarProducto = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    /*  const {
        nombreProducto,
        precioProducto,
        imagenProducto,
        stockProducto
     } = req.body
  
     const producto = {
       nombreProducto,
       precioProducto,
       imagenProducto,
       stockProducto
     }
     console.log('Producto', producto) */
    const producto = new productModels_1.default({
        nombreProducto: req.body.nombreProducto,
        precioProducto: req.body.precioProducto,
        imagenProducto: req.body.imagenProducto,
        stockProducto: req.body.stockProducto
    });
    try {
        const guardado = yield productModels_1.default.create(producto);
        res.json(guardado);
    }
    catch (error) {
        res.send('NO se pudo Guardar ------ERROR');
    }
});
exports.cargarProducto = cargarProducto;
const listarProductos = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const cookieToken = req.cookies.xToken;
    console.log('cookieToken:', cookieToken);
    try {
        //await jwt.verify(cookieToken, process.env.TOKEN_SECRET)
        try {
            const listaProductos = yield productModels_1.default.find();
            return res.render('listarTabla', {
                listaProductos
            });
        }
        catch (error) {
            console.log('Nuestros ingenieros están trabajando en el problema', error);
            return res.render('error', {
                mensaje: 'Nuestros ingenieros están trabajando en el problema'
            });
        }
    }
    catch (error) {
        return res.render('error', {
            mensaje: 'No tiene permisos para ver esta pagina'
        });
    }
});
exports.listarProductos = listarProductos;
const listarCard = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    try {
        const cards = yield productModels_1.default.find();
        res.render('listarCard', {
            cards
        });
    }
    catch (error) {
        console.log('Error:', error);
    }
});
exports.listarCard = listarCard;
const descripcionProducto = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const id = req.params._id;
    try {
        const producto = yield productModels_1.default.findById({ _id: id });
        res.render('descripcionProducto', {
            producto
        });
    }
    catch (error) {
        console.log('Error:', error);
    }
});
exports.descripcionProducto = descripcionProducto;
const eliminarProducto = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const id = req.params._id;
    try {
        const productoEliminado = yield productModels_1.default.findByIdAndDelete({ _id: id });
        console.log('Producto eliminado:', productoEliminado);
        const cards = yield productModels_1.default.find();
        res.render('listarCard', {
            cards
        });
    }
    catch (error) {
        console.log('Error:', error);
    }
});
exports.eliminarProducto = eliminarProducto;
const formularioActualizar = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const id = req.params._id;
    try {
        const productoBuscado = yield productModels_1.default.findById({ _id: id });
        console.log('Producto buscado:', productoBuscado);
        res.render('FormularioActualizar', {
            productoBuscado
        });
    }
    catch (error) {
        console.log('Error:', error);
    }
});
exports.formularioActualizar = formularioActualizar;
const actualizarProducto = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const productoActualizado = {
        nombreProducto: req.body.nombreProducto,
        precioProducto: req.body.precioProducto,
        imagenProducto: req.body.imagenProducto,
        stockProducto: req.body.stockProducto
    };
    const id = req.params._id;
    try {
        yield productModels_1.default.findByIdAndUpdate({ _id: id }, productoActualizado);
        const cards = yield productModels_1.default.find();
        res.render('listarCard', {
            cards
        });
    }
    catch (error) {
        console.log('Error:', error);
    }
});
exports.actualizarProducto = actualizarProducto;
//# sourceMappingURL=productController.js.map