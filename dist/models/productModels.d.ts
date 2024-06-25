import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    nombreProducto: string;
    precioProducto: number;
    imagenProducto: string;
    stockProducto: number;
    timestamp: Date;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    nombreProducto: string;
    precioProducto: number;
    imagenProducto: string;
    stockProducto: number;
    timestamp: Date;
}> & {
    nombreProducto: string;
    precioProducto: number;
    imagenProducto: string;
    stockProducto: number;
    timestamp: Date;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    nombreProducto: string;
    precioProducto: number;
    imagenProducto: string;
    stockProducto: number;
    timestamp: Date;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    nombreProducto: string;
    precioProducto: number;
    imagenProducto: string;
    stockProducto: number;
    timestamp: Date;
}>> & mongoose.FlatRecord<{
    nombreProducto: string;
    precioProducto: number;
    imagenProducto: string;
    stockProducto: number;
    timestamp: Date;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
