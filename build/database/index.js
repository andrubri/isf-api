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
        this.sequelize.sync({ alter: true });
    }
    /* createRelations(): void {
        Usuario.belongsTo(Persona, {foreignKey: 'idPersona'});

        Equipo.hasMany(EquipoPersona, {sourceKey: 'idEquipo', foreignKey: 'idEquipo'});

        Persona.hasMany(EquipoPersona, {sourceKey: 'idPersona', foreignKey: 'idPersona'});
        Persona.hasMany(PersonaJornada, {sourceKey: 'idPersona', foreignKey: 'idPersona'});
        Persona.hasOne(Usuario, {sourceKey: 'idPersona', foreignKey: 'idPersona'});

        EquipoPersona.hasOne(Persona, {sourceKey: 'idPersona', foreignKey: 'idPersona'});
        EquipoPersona.hasOne(Equipo, {sourceKey: 'idEquipo', foreignKey: 'idEquipo'});

        Jornada.hasMany(PersonaJornada, {sourceKey: 'idJornadas', foreignKey: 'idJornada'});

        PersonaJornada.hasOne(Persona, {sourceKey: 'idPersona', foreignKey: 'idPersona'});
        PersonaJornada.hasOne(Jornada, {sourceKey: 'idJornada', foreignKey: 'idJornadas'});
    } */
    createRelations() {
        usuario_1.Usuario.belongsTo(persona_1.Persona, { foreignKey: 'idPersona' });
        usuario_1.Usuario.belongsTo(perfil_1.Perfil, { foreignKey: 'idPerfil' });
        equipo_1.Equipo.belongsToMany(persona_1.Persona, { through: equipo_persona_1.EquipoPersona, foreignKey: 'idEquipo', otherKey: 'idPersona' });
        persona_1.Persona.belongsToMany(equipo_1.Equipo, { through: equipo_persona_1.EquipoPersona, foreignKey: 'idPersona', otherKey: 'idEquipo' });
        persona_1.Persona.belongsToMany(jornada_1.Jornada, { through: personas_jornada_1.PersonaJornada, foreignKey: 'idPersona' });
        jornada_1.Jornada.belongsToMany(persona_1.Persona, { through: personas_jornada_1.PersonaJornada, foreignKey: 'idJornada' });
        equipo_1.Equipo.hasMany(jornada_1.Jornada, { sourceKey: 'idEquipo', foreignKey: 'idEquipo' });
    }
}
exports.DBSquelize = DBSquelize;
//# sourceMappingURL=index.js.map