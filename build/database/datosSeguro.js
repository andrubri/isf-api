"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class DatosSeguro extends sequelize_1.Model {
}
exports.DatosSeguro = DatosSeguro;
function initDatosSeguro(sequelize) {
    DatosSeguro.init({
        idDatosSeguro: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        grupoSanguineo: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        emfermedades: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        medicaciones: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        idObraSocial: {
            allowNull: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
    }, {
        sequelize: sequelize,
        tableName: "datos_seguro",
        timestamps: false
    });
}
exports.initDatosSeguro = initDatosSeguro;
//# sourceMappingURL=datosSeguro.js.map