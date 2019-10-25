"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class Perfil extends sequelize_1.Model {
}
exports.Perfil = Perfil;
function initPerfil(sequelize) {
    Perfil.init({
        idPerfil: {
            primaryKey: true,
            autoIncrement: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        codigo: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        descripcion: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "perfiles",
        timestamps: false
    });
}
exports.initPerfil = initPerfil;
//# sourceMappingURL=perfil.js.map