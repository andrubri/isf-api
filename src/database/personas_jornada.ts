import {Model,DataTypes} from "sequelize";

export class PersonaJornada extends Model {
    public idPersonaJornada: number;
    public idJornada: number;
    public idPersona: number;
    public idMedioTransporte: number;
    public asistencia: string;
    public direccionOrigen: string;
    public confirmacion: string;
}

export function initPersonaJornada(sequelize) {
    PersonaJornada.init({idPersonaJornadas: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        },
        direccionOrigen: {
            allowNull: false,
            type: new DataTypes.STRING(255),
        },
        asistencia: {
            allowNull: false,
            type: new DataTypes.STRING(255),
        },
        confirmacion: {
            allowNull: false,
            type: new DataTypes.STRING(255),
        },
        idPersona: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        idMedioTransporte: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        idJornada: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
    }, {
        sequelize: sequelize,
        tableName: "personas_jornadas",
        timestamps: false
    });
}
