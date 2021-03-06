import {Model,DataTypes} from "sequelize";
import { Equipo } from "./equipo";

export class Jornada extends Model {
    public idJornadas: number;
    public idEquipo: number;
    public descripcion: string;
    public direccion: string;
    public fecha: Date;

    public Equipo: Equipo;
}

export function initJornada(sequelize) {
    Jornada.init({idJornadas: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        },
        direccion: {
            allowNull: false,
            type: new DataTypes.STRING(255),
        },
        descripcion: {
            allowNull: false,
            type: new DataTypes.STRING(255),
        },
        fecha: {
            allowNull: true,
            type: new DataTypes.DATE(),
        },
        idEquipo: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
    }, {
        sequelize: sequelize,
        tableName: "jornadas",
        timestamps: false
    });
}
