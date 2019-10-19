import {Model} from "sequelize";

export class Usuario extends Model {
    public idusuario: number;
    public token: string;
    public idPerfil: number;
    public idPersona: number;
    public nombre: string;
    public apellido: string;
    public email: string;
    public fechaBaja: Date;
}
