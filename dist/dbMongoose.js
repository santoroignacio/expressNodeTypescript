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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL_COMPASS_MONGOOSE = process.env.MONGO_URL_COMPASS_MONGOOSE;
/* export const conectarMongoose = mongoose.connect(MONGO_URL_COMPASS)
     .then( ()=>{
        console.log(`Se conectó a la base de datos con Mongoose: ${MONGO_URL_COMPASS}`)
     },
     Error =>{
        console.log(`No se conectó , error: ${Error}`)
     }
    ) */
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
//# sourceMappingURL=dbMongoose.js.map