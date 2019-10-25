"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class OrigenContacto extends sequelize_1.Model {
}
exports.OrigenContacto = OrigenContacto;
function initOrigenContacto(sequelize) {
    OrigenContacto.init({
        idOrigenContacto: {
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
        tableName: "origenes_contactos",
        timestamps: false
    });
}
exports.initOrigenContacto = initOrigenContacto;
//# sourceMappingURL=origenContacto.js.map