"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class EquipoPersona extends sequelize_1.Model {
}
exports.EquipoPersona = EquipoPersona;
function initEquipoPersona(sequelize) {
    EquipoPersona.init({
        idEquipoPersona: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        idEquipo: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        idPersona: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        idRol: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        fechaBaja: {
            allowNull: true,
            type: new sequelize_1.DataTypes.DATE(),
        }
    }, {
        sequelize: sequelize,
        tableName: "equipos_personas",
        timestamps: false
    });
}
exports.initEquipoPersona = initEquipoPersona;
//# sourceMappingURL=equipo_persona.js.map