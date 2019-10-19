"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class Equipo extends sequelize_1.Model {
}
exports.Equipo = Equipo;
function initEquipo(sequelize) {
    Equipo.init({
        direccion: {
            allowNull: false,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        fechaBaja: {
            allowNull: true,
            type: new sequelize_2.DataTypes.DATE(),
        },
        idLocalidad: {
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        idEquipo: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        nombre: {
            allowNull: false,
            type: new sequelize_2.DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "equipos",
        timestamps: false
    });
}
exports.initEquipo = initEquipo;
//# sourceMappingURL=equipo.js.map