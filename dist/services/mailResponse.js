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
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const USER = process.env.USER;
const MAIL = process.env.MAIL;
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        //user: "santoroignacio76@gmail.com", //desde donde se desea enviar el email
        //pass: "kgvp oeig pazn dzvs",//clave de contraseña de aplicaciones de google
        user: USER,
        pass: MAIL
    },
});
function enviarEmail(mail, nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        // send mail with defined transport object
        const info = yield transporter.sendMail({
            from: '"Empresa X 👻"', // sender address
            to: mail, // list of receivers
            subject: "Hola desde la empresa ✔", // Subject line
            text: `Binvenido ${nombre} a la App`, // plain text body
            html: `<h1>Sale por el mes de Mayo!!</h1><br>
             <p>Puedes comprar mas productos en nuestro sitio:
             <a href='https://www.educacionit.com/' target= '_blank'>Comprar</a>
             </p>`, // html body
        });
    });
}
exports.default = enviarEmail;
//# sourceMappingURL=mailResponse.js.map