"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class ObraSocial extends sequelize_1.Model {
}
exports.ObraSocial = ObraSocial;
function initObraSocial(sequelize) {
    ObraSocial.init({
        idObraSocial: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        empresa: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        plan: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "obras_sociales",
        timestamps: false
    });
}
exports.initObraSocial = initObraSocial;
//# sourceMappingURL=obraSocial.js.map