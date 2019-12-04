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
        idPersona: number;
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

export interface IReqEmail extends IRequest {
    payload: {
        mensaje: string;
        asunto: string;
    }
}

export interface IReqPersonaJornada extends IRequest {
    payload: {
        id: number;
        idJornada: number;
        idPersona: number;
        idMedioTransporte: number;
        asistencia: string;
        direccionOrigen: string;
        confirmacion: string;
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
            direccion: string;
            coordenadas: string;
            provincia: string,
            ciudad: string,
            fechaInicio: Date,
            fechaFin: Date
        };
        coordinadores: [{
            idPersona: number;
        }];
    }
}

export interface IReqVoluntario extends IRequest {
    payload: {
        idPersona: number;
    };
}

export interface IReqConfirmacion extends IRequest {
    payload: {
        idPersona: number;
        confirmacion: boolean;
    };
}

export interface IReqConfirExt extends IRequest {
    payload: {
        direccion: string;
        coordenadas: string;
        idMedioTransporte: number;
        espacioLibre: string;
        idContactoEmergencia: number | null;
        nombreEmergencia: string;
        apellidoEmergencia: string;
        telefonoEmergencia: string;
        relacionEmergencia: string;
    };
}

export interface IReqJornadas extends IRequest {
    payload: {
        fecha: Date;
        descripcion: string;
    };
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
            coordenadasResidencia: string;
            direccionResidencia: string;
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
            idContactoEmergencia: number;
            idPersona: number;
            nombreContacto: string;
            apellidoContacto: string;
            telefonoContacto: string;
            relacion: string;
            idDatosSeguro: number;
            grupoSanguineo: string;
            emfermedades: string;
            medicaciones: string;
            idObraSocial: number;
        }
    }
}