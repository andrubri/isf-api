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
            idvoluntario: {
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
            sequelize: this.sequelize,
            tableName: "usuarios",
            timestamps: false
        });
    }
}
exports.DBSquelize = DBSquelize;
//# sourceMappingURL=index.js.map