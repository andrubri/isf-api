"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class Persona extends sequelize_1.Model {
}
exports.Persona = Persona;
function initPersona(sequelize) {
    Persona.init({
        idPersona: {
            autoIncrement: true,
            primaryKey: true,
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
        idExterno: {
            allowNull: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        tipoDocumento: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        idDocumento: {
            allowNull: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
        paisOrigen: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        paisResidencia: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        provinciaResidencia: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        ciudadResidencia: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        telefono: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        email: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        nivelEstudios: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        carrera: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        universidad: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        ocupacion: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        comentarios: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        estado: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        dieta: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        idOrigenContacto: {
            allowNull: true,
            type: new sequelize_2.DataTypes.STRING(255),
        },
        fechaNacimiento: {
            allowNull: true,
            type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        },
    }, {
        sequelize: sequelize,
        tableName: "personas",
        timestamps: false
    });
}
exports.initPersona = initPersona;
//# sourceMappingURL=persona.js.map