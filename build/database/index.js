"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const usuario_1 = require("./usuario");
const equipo_1 = require("./equipo");
const equipo_persona_1 = require("./equipo_persona");
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
        this.initEquipo();
        this.initJornadas();
        this.initEquipoPersona();
        // Aplicar los cambios a la db
        this.sequelize.sync();
    }
    initEquipoPersona() {
        equipo_persona_1.EquipoPersona.init({
            idEquipoPersona: {
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idEquipo: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idPersona: {
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
            tableName: "equipos_personas",
            timestamps: false
        });
    }
    initEquipo() {
        equipo_1.Equipo.init({
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
            idEquipo: {
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
            tableName: "equipos",
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
            idEquipo: {
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