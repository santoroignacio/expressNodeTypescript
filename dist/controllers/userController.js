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
exports.pruebaToken = exports.loginUsuario = exports.formularioLogin = exports.registrarUsuario = exports.logoutUsuario = exports.actualizarUsuario = exports.formularioActualizar = exports.eliminarUsuario = exports.listarUsuarios = exports.formularioUsuario = void 0;
const express_1 = require("express");
const userModels_js_1 = __importDefault(require("../models/userModels.js"));
const express_validator_1 = require("express-validator");
//import bcrypt from 'bcrypt';
//import enviarEmail from "../services/mailResponse.js";
//import jwt from 'jsonwebtoken';
//import { generarJWT } from "../services/jwt.js";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const formularioUsuario = (req = express_1.request, res = express_1.response) => {
    return res.render('registrarUsuario');
};
exports.formularioUsuario = formularioUsuario;
const listarUsuarios = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const cookieToken = req.cookies.xToken;
    console.log('cookieToken:', cookieToken);
    try {
        //await jwt.verify(cookieToken, process.env.TOKEN_SECRET)
        try {
            const listaUsuarios = yield userModels_js_1.default.find();
            return res.render('listarTablaUsuarios', {
                listaUsuarios
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
exports.listarUsuarios = listarUsuarios;
const eliminarUsuario = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const id = req.params._id;
    try {
        const usuarioEliminado = yield userModels_js_1.default.findByIdAndDelete({ _id: id });
        console.log('Usuario eliminado:', usuarioEliminado);
        const listaUsuarios = yield userModels_js_1.default.find();
        res.render('listarTablaUsuarios', {
            listaUsuarios
        });
    }
    catch (error) {
        console.log('Error:', error);
    }
});
exports.eliminarUsuario = eliminarUsuario;
const formularioActualizar = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const id = req.params._id;
    try {
        const usuarioBuscado = yield userModels_js_1.default.findById({ _id: id });
        console.log('Usuario buscado:', usuarioBuscado);
        res.render('FormActualizarUsuario', {
            usuarioBuscado
        });
    }
    catch (error) {
        console.log('Error:', error);
    }
});
exports.formularioActualizar = formularioActualizar;
const actualizarUsuario = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const usuarioActualizado = {
        nombreUsuario: req.body.nombreUsuario,
        emailUsuario: req.body.emailUsuario,
        ciudadUsuario: req.body.ciudadUsuario
    };
    const id = req.params._id;
    try {
        yield userModels_js_1.default.findByIdAndUpdate({ _id: id }, usuarioActualizado);
        const listaUsuarios = yield userModels_js_1.default.find();
        res.render('listarTablaUsuarios', {
            listaUsuarios
        });
    }
    catch (error) {
        console.log('Error:', error);
    }
});
exports.actualizarUsuario = actualizarUsuario;
const logoutUsuario = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    try {
        res.clearCookie('xToken');
        //req.session.destroy()
        res.render('loginUsuario');
    }
    catch (error) {
        return res.render('error', {
            mensaje: 'No se pudo realizar el logout'
        });
    }
});
exports.logoutUsuario = logoutUsuario;
const registrarUsuario = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    //ver si los datos que vienen del front son validos
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        return res.render('registrarUsuario', {
            mensaje: 'Faltan Datos'
        });
    }
    const user = new userModels_js_1.default({
        nombreUsuario: req.body.nombreUsuario,
        emailUsuario: req.body.emailUsuario,
        passwordUsuario: req.body.passwordUsuario,
        ciudadUsuario: req.body.ciudadUsuario
    });
    //ver si el email ya existe
    const emailExiste = yield userModels_js_1.default.find({ emailUsuario: user.emailUsuario });
    if (emailExiste.length > 0) {
        return res.json({ mensaje: 'Ese email ya fue registrado anteriormente' });
    }
    //encriptar contraseña
    /* const salt = await bcrypt.genSalt(10)
    console.log(salt)
    user.passwordUsuario = await bcrypt.hash(req.body.passwordUsuario, salt)
    console.log(user.passwordUsuario) */
    //registro el usuario
    try {
        const usuario = yield userModels_js_1.default.create(user);
        //await enviarEmail(req.body.emailUsuario, req.body.nombreUsuario)
        return res.render('loginUsuario');
        //res.json(usuario)
    }
    catch (error) {
        return res.render('error', {
            mensaje: 'El usuario no se pudo registrar'
        });
    }
});
exports.registrarUsuario = registrarUsuario;
const formularioLogin = (req = express_1.request, res = express_1.response) => {
    return res.render('loginUsuario');
};
exports.formularioLogin = formularioLogin;
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
const loginUsuario = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    //validar datos del front
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        return res.render('loginUsuario', {
            mensaje: 'Faltan Datos en el login'
        });
    }
    //ver si email existe para ingresar
    const { emailUsuario, passwordUsuario } = req.body;
    const usuarioExiste = yield userModels_js_1.default.find({ emailUsuario: emailUsuario });
    console.log('usuario existe:', usuarioExiste);
    if (!usuarioExiste[0]) {
        return res.render('registrarUsuario', {
            mensaje: 'Antes debe registrarse'
        });
    }
    //verificar si la contraseña es la correcta, desencriptar
    try {
        /* const passwordCorrecto = await bcrypt.compare(passwordUsuario, usuarioExiste[0].passwordUsuario)
        console.log('password correcto:', passwordCorrecto)
        console.log('usuarioExiste:', usuarioExiste[0]._id)
    
        if (!passwordCorrecto) {
          return res.render('loginUsuario', {
            mensaje: 'El usuario o la contraseña son incorrectos'
          })
        } */
        //generar un user
        const user = {
            _id: usuarioExiste[0]._id,
            nombre: usuarioExiste[0].nombreUsuario,
            email: usuarioExiste[0].emailUsuario,
            password: usuarioExiste[0].passwordUsuario
        };
        //asignar el JWT al User con algunos datos
        //const token = await generarJWT(user.nombre, user.email);
        //asignar el JWT al User con todos los datos datos
        /*  const token = await generarJWT(user);
     
     
         console.log('Token:', token)
         res.cookie('xToken', token)
      */
        //agregamos la sesion al user con el token
        /*  req.session.user = {
           _id: usuarioExiste[0]._id,
           nombre: usuarioExiste[0].nombreUsuario,
           email: usuarioExiste[0].emailUsuario,
           token
         }
     
         console.log('=======================')
         console.log(req.session.user)
         console.log('=======================')
     
         await req.session.save()
     
         console.log('Usuario autenticado correctamente')
      */
        return res.render('admin');
    }
    catch (error) {
        console.log('Error:', error);
    }
});
exports.loginUsuario = loginUsuario;
const pruebaToken = (req = express_1.request, res = express_1.response) => {
    res.render('admin');
};
exports.pruebaToken = pruebaToken;
//# sourceMappingURL=userController.js.map