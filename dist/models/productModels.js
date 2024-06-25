"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productShema = new mongoose_1.Schema({
    nombreProducto: {
        type: String,
        required: true
    },
    precioProducto: {
        type: Number,
        required: true
    },
    imagenProducto: {
        type: String,
        required: true
    },
    stockProducto: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: new Date()
    }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)('productos', productShema);
//# sourceMappingURL=productModels.js.map