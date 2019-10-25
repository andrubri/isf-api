"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class Rol extends sequelize_1.Model {
}
exports.Rol = Rol;
function initRol(sequelize) {
    Rol.init({
        idRol: {
            primaryKey: true,
            autoIncrement: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        representacion: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        descripcion: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "roles",
        timestamps: false
    });
}
exports.initRol = initRol;
//# sourceMappingURL=rol.js.map