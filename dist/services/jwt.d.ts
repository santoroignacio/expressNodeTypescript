import { IUserToken } from "../types/userToken";
declare const generarJWT: (user: IUserToken) => Promise<unknown>;
export { generarJWT };
