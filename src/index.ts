import express, { Request, Response } from "express"
import path from 'node:path'
import hbs from 'hbs'
import productRouter from './routes/productRouter'
import userRouter from './routes/userRouter.js'
import cors from 'cors'
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import bodyParser from "body-parser"
import mongoose from 'mongoose'

import dotenv from 'dotenv'
import { cookie } from "express-validator"
dotenv.config()

const PORT: string | number = process.env.PORT || 1234
const miClave: string | string[] = process.env.SECRET_SESSION!

const app = express()
//middlewares
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static('/public'))


//session con mongo-connect

app.use(session({
    secret: miClave,
    saveUninitialized: false, 
    resave: true, 
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL_COMPASS_MONGOOSE,
     
    }),
    cookie:{
        maxAge: 60000
    }
  }));

//rutas
app.use('/producto', productRouter )
app.use('/usuario', userRouter )

app.set('view engine', 'hbs')
app.set('views','src/views')
hbs.registerPartials('src/views/partials')

app.get('/', (req: Request, res: Response)=>{
    res.render('index')
})
app.get('*', (req: Request, res: Response)=>{
    res.render('error')
})


//*******************************Correr Server*************************************************** */
 const server = app.listen(PORT)
server.on('listening', ()=>{
    console.log(`Servidor escuchando en http://127.0.0.1:${PORT}`)
});

server.on('error', (error)=>{
    console.log(`Error en el servidor: ${error}`)   
});

//*********************************Correr BD con Mongoose**************************************** */

const MONGO_URL_COMPASS_MONGOOSE: string = process.env.MONGO_URL_COMPASS_MONGOOSE!


    export const conectarMongoose = async()=>{
        try {
            await mongoose.connect(MONGO_URL_COMPASS_MONGOOSE)
            console.log(`Se conectó a la base de datos con Mongoose: ${MONGO_URL_COMPASS_MONGOOSE}`)
        } catch (error) {
            console.log(`No se conectó , error: ${error}`)   
        }
    }

    conectarMongoose()
export default app
































