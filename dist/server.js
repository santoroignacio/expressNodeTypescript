"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 1234;
const server = index_1.default.listen(PORT);
server.on('listening', () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${PORT}`);
});
server.on('error', (error) => {
    console.log(`Error en el servidor: ${error}`);
});
//# sourceMappingURL=server.js.map