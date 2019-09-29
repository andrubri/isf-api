"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const usuario_1 = require("./usuario");
class DBSquelize {
    constructor(config) {
        this.sequelize = new sequelize_1.Sequelize(config.connection.database, config.connection.user, config.connection.password, {
            dialect: config.connection.dialect,
            host: config.connection.host,
            logging: false,
        });
        // Iinicio las entidades
        this.initUsuario();
    }
    initUsuario() {
        usuario_1.Usuario.init({
            apellido: {
                allowNull: false,
                type: new sequelize_1.DataTypes.STRING(255),
            },
            createdAt: {
                field: "fechaAlta",
                type: new sequelize_1.DataTypes.DATE(),
            },
            email: {
                allowNull: false,
                type: new sequelize_1.DataTypes.STRING(255),
            },
            fechaBaja: {
                allowNull: true,
                type: new sequelize_1.DataTypes.DATE(),
            },
            idEmpresa: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idEstado: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idPerfil: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idUsuario: {
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idUsuarioCreador: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idUsuarioUltModi: {
                allowNull: true,
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
            updatedAt: {
                field: "fechaMod",
                type: new sequelize_1.DataTypes.DATE(),
            },
        }, {
            sequelize: this.sequelize,
            tableName: "usuarios",
        });
    }
}
exports.DBSquelize = DBSquelize;
//# sourceMappingURL=index.js.map