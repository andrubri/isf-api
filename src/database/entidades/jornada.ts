import {Model,DataTypes} from "sequelize";

export class Jornada extends Model {
    public idJornada: number;
    public idEquipo: number;
    public descripcion: string;
    public direccion: string;
    public fecha: Date;
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
