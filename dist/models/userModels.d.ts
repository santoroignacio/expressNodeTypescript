import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    timestamp: Date;
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    ciudadUsuario?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    timestamp: Date;
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    ciudadUsuario?: string | null | undefined;
}> & {
    timestamp: Date;
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    ciudadUsuario?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    timestamp: Date;
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    ciudadUsuario?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    timestamp: Date;
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    ciudadUsuario?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    timestamp: Date;
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    ciudadUsuario?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
