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

export interface IReqUser extends IRequest{
  payload: {
    id: number;
    nombre: string;
    email: string;
    clave: string;
    idPerfil: number;
    apellido: string;
  }

}