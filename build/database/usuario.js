"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Usuario extends sequelize_1.Model {
}
exports.Usuario = Usuario;
function initUsuario(sequelize) {
    Usuario.init({
        apellido: {
            allowNull: false,
            type: new sequelize_1.DataTypes.STRING(255),
        },
        email: {
            allowNull: false,
            type: new sequelize_1.DataTypes.STRING(255),
        },
        fechaBaja: {
            allowNull: true,
            type: new sequelize_1.DataTypes.DATE(),
        },
        idperfil: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        idPersona: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        idusuario: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        nombre: {
            allowNull: false,
            type: new sequelize_1.DataTypes.STRING(255),
        },
        token: {
            allowNull: false,
            type: new sequelize_1.DataTypes.STRING(100),
        },
    }, {
        sequelize: sequelize,
        tableName: "usuarios",
        timestamps: false
    });
}
exports.initUsuario = initUsuario;
//# sourceMappingURL=usuario.js.map