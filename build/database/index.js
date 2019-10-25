"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const usuario_1 = require("./entidades/usuario");
const equipo_1 = require("./entidades/equipo");
const equipo_persona_1 = require("./entidades/equipo_persona");
const jornada_1 = require("./entidades/jornada");
const persona_1 = require("./entidades/persona");
const contactoEmergencia_1 = require("./entidades/contactoEmergencia");
const datosSeguro_1 = require("./entidades/datosSeguro");
const obraSocial_1 = require("./entidades/obraSocial");
const perfil_1 = require("./entidades/perfil");
const origenContacto_1 = require("./entidades/origenContacto");
const rol_1 = require("./entidades/rol");
const medioTransporte_1 = require("./entidades/medioTransporte");
const personas_jornada_1 = require("./entidades/personas_jornada");
class DBSquelize {
    constructor(config) {
        this.sequelize = new sequelize_1.Sequelize(config.connection.database, config.connection.user, config.connection.password, {
            dialect: config.connection.dialect,
            host: config.connection.host,
            logging: true,
        });
        // Iinicio las entidades
        usuario_1.initUsuario(this.sequelize);
        equipo_1.initEquipo(this.sequelize);
        jornada_1.initJornada(this.sequelize);
        equipo_persona_1.initEquipoPersona(this.sequelize);
        persona_1.initPersona(this.sequelize);
        contactoEmergencia_1.initContactoEmergencia(this.sequelize);
        datosSeguro_1.initDatosSeguro(this.sequelize);
        obraSocial_1.initObraSocial(this.sequelize);
        perfil_1.initPerfil(this.sequelize);
        medioTransporte_1.initMedioTransporte(this.sequelize);
        origenContacto_1.initOrigenContacto(this.sequelize);
        rol_1.initRol(this.sequelize);
        personas_jornada_1.initPersonaJornada(this.sequelize);
        this.createRelations();
        // Aplicar los cambios a la db
        //this.sequelize.sync({alter: true});
    }
    createRelations() {
        usuario_1.Usuario.belongsTo(persona_1.Persona, { foreignKey: 'idPersona' });
        equipo_1.Equipo.hasMany(equipo_persona_1.EquipoPersona, { sourceKey: 'idEquipo', foreignKey: 'idEquipo' });
        persona_1.Persona.hasMany(equipo_persona_1.EquipoPersona, { sourceKey: 'idPersona', foreignKey: 'idPersona' });
        persona_1.Persona.hasMany(personas_jornada_1.PersonaJornada, { sourceKey: 'idPersona', foreignKey: 'idPersona' });
        persona_1.Persona.hasOne(usuario_1.Usuario, { sourceKey: 'idPersona', foreignKey: 'idPersona' });
        equipo_persona_1.EquipoPersona.hasOne(persona_1.Persona, { sourceKey: 'idPersona', foreignKey: 'idPersona' });
        equipo_persona_1.EquipoPersona.hasOne(equipo_1.Equipo, { sourceKey: 'idEquipo', foreignKey: 'idEquipo' });
        jornada_1.Jornada.hasMany(personas_jornada_1.PersonaJornada, { sourceKey: 'idJornadas', foreignKey: 'idJornada' });
        personas_jornada_1.PersonaJornada.hasOne(persona_1.Persona, { sourceKey: 'idPersona', foreignKey: 'idPersona' });
        personas_jornada_1.PersonaJornada.hasOne(jornada_1.Jornada, { sourceKey: 'idJornada', foreignKey: 'idJornadas' });
    }
}
exports.DBSquelize = DBSquelize;
//# sourceMappingURL=index.js.map