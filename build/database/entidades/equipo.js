"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class Equipo extends sequelize_1.Model {
}
exports.Equipo = Equipo;
function initEquipo(sequelize) {
    Equipo.init({
        idEquipo: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        nombre: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        descripcion: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        estado: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        ciudad: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        provincia: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        categoria: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        fechaInicio: {
            allowNull: true,
            type: new sequelize_2.DataTypes.DATE(),
        },
        fechaFin: {
            allowNull: true,
            type: new sequelize_2.DataTypes.DATE(),
        },
    }, {
        sequelize: sequelize,
        tableName: "equipos",
        timestamps: false
    });
}
exports.initEquipo = initEquipo;
//# sourceMappingURL=equipo.js.map