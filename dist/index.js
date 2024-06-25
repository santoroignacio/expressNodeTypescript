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
exports.conectarMongoose = void 0;
const express_1 = __importDefault(require("express"));
const hbs_1 = __importDefault(require("hbs"));
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const userRouter_js_1 = __importDefault(require("./routes/userRouter.js"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 1234;
const miClave = process.env.SECRET_SESSION;
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('/public'));
//session con mongo-connect
/* app.use(session({
    secret: miClave,
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL_COMPASS_MONGOOSE,
     
    }),
    cookie:{
        maxAge: 60000
    }
  })); */
//rutas
app.use('/producto', productRouter_1.default);
app.use('/usuario', userRouter_js_1.default);
app.set('view engine', 'hbs');
app.set('views', 'src/views');
hbs_1.default.registerPartials('src/views/partials');
app.get('/', (req, res) => {
    res.render('index');
});
app.get('*', (req, res) => {
    res.render('error');
});
/* export const conectarMongoose = mongoose.connect(MONGO_URL_COMPASS)
     .then( ()=>{
        console.log(`Se conectó a la base de datos con Mongoose: ${MONGO_URL_COMPASS}`)
     },
     Error =>{
        console.log(`No se conectó , error: ${Error}`)
     }
    ) */
const server = app.listen(PORT);
server.on('listening', () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${PORT}`);
});
server.on('error', (error) => {
    console.log(`Error en el servidor: ${error}`);
});
const MONGO_URL_COMPASS_MONGOOSE = process.env.MONGO_URL_COMPASS_MONGOOSE;
const conectarMongoose = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URL_COMPASS_MONGOOSE);
        console.log(`Se conectó a la base de datos con Mongoose: ${MONGO_URL_COMPASS_MONGOOSE}`);
    }
    catch (error) {
        console.log(`No se conectó , error: ${error}`);
    }
});
exports.conectarMongoose = conectarMongoose;
(0, exports.conectarMongoose)();
exports.default = app;
//# sourceMappingURL=index.js.map