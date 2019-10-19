"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const usuario_1 = require("./usuario");
const actividad_1 = require("./actividad");
const actividades_voluntarios_1 = require("./actividades_voluntarios");
const jornada_1 = require("./jornada");
class DBSquelize {
    constructor(config) {
        this.sequelize = new sequelize_1.Sequelize(config.connection.database, config.connection.user, config.connection.password, {
            dialect: config.connection.dialect,
            host: config.connection.host,
            logging: false,
        });
        // Iinicio las entidades
        this.initUsuario();
        this.initActividad();
        this.initJornadas();
        this.initActividadVoluntario();
        this.sequelize.sync();
    }
    initActividadVoluntario() {
        actividades_voluntarios_1.ActividadesVoluntarios.init({
            idActividadVoluntario: {
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idActividad: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idVoluntario: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idRol: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            fechaBaja: {
                allowNull: true,
                type: new sequelize_1.DataTypes.DATE(),
            }
        }, {
            sequelize: this.sequelize,
            tableName: "actividades_voluntarios",
            timestamps: false
        });
    }
    initActividad() {
        actividad_1.Actividad.init({
            direccion: {
                allowNull: false,
                type: new sequelize_1.DataTypes.STRING(255),
            },
            fechaBaja: {
                allowNull: true,
                type: new sequelize_1.DataTypes.DATE(),
            },
            idLocalidad: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idActividad: {
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            nombre: {
                allowNull: false,
                type: new sequelize_1.DataTypes.STRING(255),
            },
        }, {
            sequelize: this.sequelize,
            tableName: "actividades",
            timestamps: false
        });
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
    initJornadas() {
        jornada_1.Jornada.init({ idJornadas: {
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
            idActividad: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
        }, {
            sequelize: this.sequelize,
            tableName: "jornadas",
            timestamps: false
        });
    }
}
exports.DBSquelize = DBSquelize;
//# sourceMappingURL=index.js.map