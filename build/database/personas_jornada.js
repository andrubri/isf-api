"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class PersonaJornada extends sequelize_1.Model {
}
exports.PersonaJornada = PersonaJornada;
function initPersonaJornada(sequelize) {
    PersonaJornada.init({ idPersonaJornadas: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        direccionOrigen: {
            allowNull: false,
            type: new sequelize_1.DataTypes.STRING(255),
        },
        asistencia: {
            allowNull: false,
            type: new sequelize_1.DataTypes.STRING(255),
        },
        confirmacion: {
            allowNull: false,
            type: new sequelize_1.DataTypes.STRING(255),
        },
        idPersona: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        idMedioTransporte: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        idJornada: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
    }, {
        sequelize: sequelize,
        tableName: "personas_jornadas",
        timestamps: false
    });
}
exports.initPersonaJornada = initPersonaJornada;
//# sourceMappingURL=personas_jornada.js.map