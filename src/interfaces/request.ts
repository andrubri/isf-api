import * as Hapi from 'hapi';

export interface ICredentials extends Hapi.AuthCredentials {
    iss: string;
    aud: string;
    auth_time: Date;
    user_id: string;
    sub: string;
    email: string;
    uid: string;
}

export interface IRequestAuth extends Hapi.RequestAuth {
    credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
    auth: IRequestAuth;
}

export interface IReqUser extends IRequest {
    payload: {
        id: number;
        nombre: string;
        email: string;
        clave: string;
        idPerfil: number;
        apellido: string;
    }
}

export interface IReqJornada extends IRequest {
    payload: {
        id: number;
        descripcion: string;
        direccion: string;
        idEquipo: number;
        fecha: Date;
    }
}

export interface IReqEquipo extends IRequest {
    payload: {
        equipo: {
            id: number;
            nombre: string;
            descripcion: string,
            categoria: string,
            estado: string,
            provincia: string,
            ciudad:string,
            fechaInicio: Date,
            fechaFin : Date
        };
        coordinadores: [{
            idPersona: number;
        }];
    }
}