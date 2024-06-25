"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userShema = new mongoose_1.Schema({
    nombreUsuario: {
        type: String,
        required: true
    },
    emailUsuario: {
        type: String,
        required: true,
        unique: true
    },
    passwordUsuario: {
        type: String,
        required: true
    },
    ciudadUsuario: {
        type: String
    },
    timestamp: {
        type: Date,
        default: new Date()
    }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)('Usuario', userShema);
//# sourceMappingURL=userModels.js.map