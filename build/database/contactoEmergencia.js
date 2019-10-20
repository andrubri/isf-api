"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class ContactoEmergencia extends sequelize_1.Model {
}
exports.ContactoEmergencia = ContactoEmergencia;
function initContactoEmergencia(sequelize) {
    ContactoEmergencia.init({
        idContactoEmergencia: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        idPersona: {
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        nombre: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        apellido: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        telefono: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        relacion: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "contactos_emergencias",
        timestamps: false
    });
}
exports.initContactoEmergencia = initContactoEmergencia;
//# sourceMappingURL=contactoEmergencia.js.map