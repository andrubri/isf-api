import {Model} from "sequelize";
import {DataTypes} from "sequelize";

export class Equipo extends Model {
    public idEquipo: number;
    public nombre: string;
    public direccion: string;
    public idLocalidad: number;
    public fechaBaja: Date;
}

export function initEquipo(sequelize) {
    Equipo.init({
        direccion: {
            allowNull: false,
            type: new DataTypes.STRING(255),
        },
        fechaBaja: {
            allowNull: true,
            type: new DataTypes.DATE(),
        },
        idLocalidad: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        idEquipo: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        nombre: {
            allowNull: false,
            type: new DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "equipos",
        timestamps: false
    });

}
