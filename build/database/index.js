"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const usuario_1 = require("./usuario");
const equipo_1 = require("./equipo");
const equipo_persona_1 = require("./equipo_persona");
const jornada_1 = require("./jornada");
const persona_1 = require("./persona");
const contactoEmergencia_1 = require("./contactoEmergencia");
class DBSquelize {
    constructor(config) {
        this.sequelize = new sequelize_1.Sequelize(config.connection.database, config.connection.user, config.connection.password, {
            dialect: config.connection.dialect,
            host: config.connection.host,
            logging: false,
        });
        // Iinicio las entidades
        usuario_1.initUsuario(this.sequelize);
        equipo_1.initEquipo(this.sequelize);
        jornada_1.initJornada(this.sequelize);
        equipo_persona_1.initEquipoPersona(this.sequelize);
        persona_1.initPersona(this.sequelize);
        contactoEmergencia_1.initContactoEmergencia(this.sequelize);
        // Aplicar los cambios a la db
        this.sequelize.sync({ alter: true });
    }
}
exports.DBSquelize = DBSquelize;
//# sourceMappingURL=index.js.map