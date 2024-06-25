import { request, response } from "express";
import User from '../models/userModels.js'
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import enviarEmail from "../services/mailResponse";
//import jwt from 'jsonwebtoken';
//import { generarJWT } from "../services/jwt.js";
import dotenv from 'dotenv';
dotenv.config();

export const formularioUsuario = (req = request, res = response) => {
  return res.render('registrarUsuario')
}

export const listarUsuarios = async (req = request, res = response) => {

  const cookieToken = req.cookies.xToken
  console.log('cookieToken:', cookieToken)



  try {
    //await jwt.verify(cookieToken, process.env.TOKEN_SECRET)
    try {
      const listaUsuarios = await User.find()
      return res.render('listarTablaUsuarios', {
        listaUsuarios
      })
    } catch (error) {
      console.log('Nuestros ingenieros están trabajando en el problema', error)
      return res.render('error', {
        mensaje: 'Nuestros ingenieros están trabajando en el problema'
      })
    }
  } catch (error) {
    return res.render('error', {
      mensaje: 'No tiene permisos para ver esta pagina'
    })
  }


}

export const eliminarUsuario = async (req = request, res = response) => {
  const id = req.params._id
  try {
    const usuarioEliminado = await User.findByIdAndDelete({ _id: id })
    console.log('Usuario eliminado:', usuarioEliminado)
    const listaUsuarios = await User.find()
    res.render('listarTablaUsuarios', {
      listaUsuarios
    })

  } catch (error) {
    console.log('Error:', error)
  }
}

export const formularioActualizar = async (req = request, res = response) => {
  const id = req.params._id
  try {
    const usuarioBuscado = await User.findById({ _id: id })
    console.log('Usuario buscado:', usuarioBuscado)
    res.render('FormActualizarUsuario', {
      usuarioBuscado
    })
  } catch (error) {
    console.log('Error:', error)
  }
}


export const actualizarUsuario = async (req = request, res = response) => {

  const usuarioActualizado = {
    nombreUsuario: req.body.nombreUsuario,
    emailUsuario: req.body.emailUsuario,
    ciudadUsuario: req.body.ciudadUsuario
  }

  const id = req.params._id

  try {
    await User.findByIdAndUpdate({ _id: id }, usuarioActualizado)
    const listaUsuarios = await User.find()
    res.render('listarTablaUsuarios', {
      listaUsuarios
    })
  } catch (error) {
    console.log('Error:', error)
  }

}

export const logoutUsuario = async (req = request, res = response) => {
  try {
    res.clearCookie('xToken')
    //req.session.destroy()
    res.render('loginUsuario')
  } catch (error) {
    return res.render('error', {
      mensaje: 'No se pudo realizar el logout'
    })
  }
}


export const registrarUsuario = async (req = request, res = response) => {
  //ver si los datos que vienen del front son validos
  const errores = validationResult(req)

  if (!errores.isEmpty()) {
    return res.render('registrarUsuario', {
      mensaje: 'Faltan Datos'
    })
  }


  const user = new User({
    nombreUsuario: req.body.nombreUsuario,
    emailUsuario: req.body.emailUsuario,
    passwordUsuario: req.body.passwordUsuario,
    ciudadUsuario: req.body.ciudadUsuario
  })

  //ver si el email ya existe
  const emailExiste = await User.find({ emailUsuario: user.emailUsuario })

  if (emailExiste.length > 0) {
    return res.json({ mensaje: 'Ese email ya fue registrado anteriormente' })
  }

  //encriptar contraseña
  const salt = await bcrypt.genSalt(10)
  console.log(salt)
  user.passwordUsuario = await bcrypt.hash(req.body.passwordUsuario, salt)
  console.log(user.passwordUsuario)

  //registro el usuario

  try {
    const usuario = await User.create(user)
    await enviarEmail(req.body.emailUsuario, req.body.nombreUsuario)
    return res.render('loginUsuario')
    //res.json(usuario)
  } catch (error) {
    return res.render('error', {
      mensaje: 'El usuario no se pudo registrar'
    })
  }

}

export const formularioLogin = (req = request, res = response) => {
  return res.render('loginUsuario')
}
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export const loginUsuario = async (req = request, res = response) => {
  //validar datos del front
  const errores = validationResult(req)

  if (!errores.isEmpty()) {
    return res.render('loginUsuario', {
      mensaje: 'Faltan Datos en el login'
    })
  }

  //ver si email existe para ingresar

  const {
    emailUsuario,
    passwordUsuario
  } = req.body

  const usuarioExiste = await User.find({ emailUsuario: emailUsuario })
  console.log('usuario existe:', usuarioExiste)

  if (!usuarioExiste[0]) {
    return res.render('registrarUsuario', {
      mensaje: 'Antes debe registrarse'
    })
  }

  //verificar si la contraseña es la correcta, desencriptar


  try {
    const passwordCorrecto = await bcrypt.compare(passwordUsuario, usuarioExiste[0].passwordUsuario)
    console.log('password correcto:', passwordCorrecto)
    console.log('usuarioExiste:', usuarioExiste[0]._id)

    if (!passwordCorrecto) {
      return res.render('loginUsuario', {
        mensaje: 'El usuario o la contraseña son incorrectos'
      })
    }

    //generar un user
    const user = {
      _id: usuarioExiste[0]._id,
      nombre: usuarioExiste[0].nombreUsuario,
      email: usuarioExiste[0].emailUsuario,
      password: usuarioExiste[0].passwordUsuario
    }

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

    return res.render('admin')
  } catch (error) {
    console.log('Error:', error)
  }

}

export const pruebaToken = (req=request, res=response) => {
  res.render('admin')
}