"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class MedioTransporte extends sequelize_1.Model {
}
exports.MedioTransporte = MedioTransporte;
function initMedioTransporte(sequelize) {
    MedioTransporte.init({
        idMedioTransporte: {
            primaryKey: true,
            autoIncrement: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        descripcion: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "medios_transporte",
        timestamps: false
    });
}
exports.initMedioTransporte = initMedioTransporte;
//# sourceMappingURL=medioTransporte.js.map