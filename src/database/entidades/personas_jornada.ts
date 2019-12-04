import {Model,DataTypes} from "sequelize";

export class PersonaJornada extends Model {
    public idPersonaJornada: number;
    public idJornada: number;
    public idPersona: number;
    public idMedioTransporte: number;
    public lugaresLibres: string;
    public asistencia: string;
    public direccionOrigen: string;
    public coordenadasOrigen: string;
    public confirmacion: string;
}

export function initPersonaJornada(sequelize) {
    PersonaJornada.init({idPersonaJornadas: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        },
        direccionOrigen: {
            allowNull: true,
            type: new DataTypes.STRING(500),
        },
        coordenadasOrigen: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        asistencia: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        confirmacion: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        idPersona: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        idMedioTransporte: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        lugaresLibres: {
            allowNull: true,
            type: new DataTypes.STRING(255),
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
