import {Model} from "sequelize";
import {DataTypes,HasManyGetAssociationsMixin} from "sequelize";
import { Persona } from "./persona";

export class Equipo extends Model {
    public idEquipo: number;
    public nombre: string;
    public descripcion: string;
    public estado: string;
    public ciudad: string;
    public provincia: string;
    public categoria: string;
    public fechaInicio: Date;
    public fechaFin: Date;

    public getPersonas!: HasManyGetAssociationsMixin<Persona>
}

export function initEquipo(sequelize) {
    Equipo.init({
        idEquipo: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        nombre: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        descripcion: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        estado: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        ciudad: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        provincia: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        categoria: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        fechaInicio: {
            allowNull: true,
            type: new DataTypes.DATE(),
        },
        fechaFin: {
            allowNull: true,
            type: new DataTypes.DATE(),
        },
    }, {
        sequelize: sequelize,
        tableName: "equipos",
        timestamps: false
    });

}
