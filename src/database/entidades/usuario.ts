import {Model,DataTypes} from "sequelize";

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

export function initUsuario(sequelize) {
    Usuario.init({
        apellido: {
            allowNull: false,
            type: new DataTypes.STRING(255),
        },
        email: {
            allowNull: false,
            type: new DataTypes.STRING(255),
        },
        fechaBaja: {
            allowNull: true,
            type: new DataTypes.DATE(),
        },
        idPerfil: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        idPersona: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        idUsuario: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        nombre: {
            allowNull: false,
            type: new DataTypes.STRING(255),
        },
        token: {
            allowNull: false,
            type: new DataTypes.STRING(100),
        },
    }, {
        sequelize: sequelize,
        tableName: "usuarios",
        timestamps: false
    });

}
