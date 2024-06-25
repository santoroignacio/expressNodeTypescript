import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';
import { IUserToken } from "../types/userToken";


const generarJWT = (user: IUserToken) => {

    return new Promise((resolve, reject) => {

        //firmar el token
        jwt.sign(user, process.env.TOKEN_SECRET!, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });

};

export {
    generarJWT
}