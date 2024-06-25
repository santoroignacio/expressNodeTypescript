import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    timestamp: Date;
    ciudadUsuario?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    timestamp: Date;
    ciudadUsuario?: string | null | undefined;
}> & {
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    timestamp: Date;
    ciudadUsuario?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    timestamp: Date;
    ciudadUsuario?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    timestamp: Date;
    ciudadUsuario?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    timestamp: Date;
    ciudadUsuario?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
