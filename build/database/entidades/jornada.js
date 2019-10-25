"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Jornada extends sequelize_1.Model {
}
exports.Jornada = Jornada;
function initJornada(sequelize) {
    Jornada.init({ idJornadas: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        direccion: {
            allowNull: false,
            type: new sequelize_1.DataTypes.STRING(255),
        },
        descripcion: {
            allowNull: false,
            type: new sequelize_1.DataTypes.STRING(255),
        },
        fecha: {
            allowNull: true,
            type: new sequelize_1.DataTypes.DATE(),
        },
        idEquipo: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
    }, {
        sequelize: sequelize,
        tableName: "jornadas",
        timestamps: false
    });
}
exports.initJornada = initJornada;
//# sourceMappingURL=jornada.js.map