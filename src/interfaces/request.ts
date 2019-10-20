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
export interface IReqPersona extends IRequest {
    payload: {
        persona: {
            id: number;
            nombre: string;
            apellido: string;
            idExterno: number;
            tipoDocumento: string;
            idDocumento: number;
            paisOrigen: string;
            paisResidencia: string;
            provinciaResidencia: string;
            ciudadResidencia: string;
            telefono: string;
            email: string;
            nivelEstudios: string;
            carrera: string;
            universidad: string;
            ocupacion: string;
            comentarios: string;
            estado: string;
            dieta: string;
            fechaNacimiento: Date;
            idOrigenContacto: number;
        };
        origenContacto: {
            idOrigenContacto: number;
            descripcion: string;
        };
        contactoEmergencia: {
            idContactoEmergencia: number;
            idPersona: number;
            nombre: string;
            apellido: string;
            telefono: string;
            relacion: string;
        };
        datosSeguro:{
            idDatosSeguro: number;
            grupoSanguineo: string;
            emfermedades: string;
            medicaciones: string;
            idObraSocial: number;
        }
        obraSocial:{
            idObraSocial: number;
            empresa: string;
            plan: string;
        }
    }
}