import {Model} from "sequelize";
import {DataTypes} from "sequelize";

export class Persona extends Model {
    public idPersona: number;
    public nombre: string;
    public apellido: string;
    public idExterno: number;
    public tipoDocumento: string;
    public idDocumento: number;
    public paisOrigen: string; // last
    public paisResidencia: string;
    public provinciaResidencia: string;
    public ciudadResidencia: string;
    public telefono: string;
    public email: string;
    public nivelEstudios: string;
    public carrera: string;
    public universidad: string;
    public ocupacion: string;
    public comentarios: string;
    public estado: string;
    public dieta: string;
    public idOrigenContacto: number;
    
}

export function initPersona(sequelize) {
    Persona.init({
        idPersona: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        nombre: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        apellido: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        idExterno: {
            allowNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        tipoDocumento: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        idDocumento: {
            allowNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        paisOrigen: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        paisResidencia: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        provinciaResidencia: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        ciudadResidencia: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        telefono: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        email: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        nivelEstudios: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        carrera: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        universidad: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        ocupacion: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        comentarios: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        estado: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        dieta: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        idOrigenContacto: {
            allowNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        fechaNacimiento: {
            allowNull: true,
            type:  new DataTypes.DATE(),
        },
    }, {
        sequelize: sequelize,
        tableName: "personas",
        timestamps: false
    });

}
