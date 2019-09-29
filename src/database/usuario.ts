import {Model} from "sequelize";

export class Usuario extends Model {
    public idUsuario!: number;
    public idPerfil!: number;
    public idEmpresa!: number;
    public idEstado!: number;
    public token!: string;
    public nombre: string;
    public apellido: string;
    public email: string;
    public readonly fechaBaja: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt: Date | null;
    public readonly idUsuarioCreador: number;
    public readonly idUsuarioUltModi: number | null;

}
