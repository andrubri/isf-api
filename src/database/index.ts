import {DataType, DataTypes, Sequelize} from "sequelize";
import {IDataConfiguration} from "../configurations";
import {initUsuario, Usuario} from "./entidades/usuario";
import {initEquipo, Equipo} from "./entidades/equipo";
import {EquipoPersona, initEquipoPersona} from "./entidades/equipo_persona";
import {initJornada, Jornada} from "./entidades/jornada";
import {initPersona, Persona} from "./entidades/persona";
import {initContactoEmergencia} from "./entidades/contactoEmergencia";
import {initDatosSeguro} from "./entidades/datosSeguro";
import {initObraSocial} from "./entidades/obraSocial";
import {initPerfil, Perfil} from "./entidades/perfil";
import {initOrigenContacto} from "./entidades/origenContacto";
import {initRol} from "./entidades/rol";
import {initMedioTransporte} from "./entidades/medioTransporte";
import {initPersonaJornada, PersonaJornada} from "./entidades/personas_jornada";


export class DBSquelize {
    private sequelize: Sequelize;

    constructor(config: IDataConfiguration) {
        this.sequelize = new Sequelize(config.connection.database, config.connection.user, config.connection.password, {
            dialect: config.connection.dialect,
            host: config.connection.host,
            logging: true,
        });

        // Iinicio las entidades
        initUsuario(this.sequelize);
        initEquipo(this.sequelize);
        initJornada(this.sequelize);
        initEquipoPersona(this.sequelize);
        initPersona(this.sequelize);
        initContactoEmergencia(this.sequelize);
        initDatosSeguro(this.sequelize);
        initObraSocial(this.sequelize);
        initPerfil(this.sequelize);
        initMedioTransporte(this.sequelize);
        initOrigenContacto(this.sequelize);
        initRol(this.sequelize);
        initPersonaJornada(this.sequelize);

        this.createRelations();

        // Aplicar los cambios a la db
        this.sequelize.sync({alter: true});
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

    createRelations(): void {
        Usuario.belongsTo(Persona, {foreignKey: 'idPersona'});
        Usuario.belongsTo(Perfil,{foreignKey:'idPerfil'})

        Equipo.belongsToMany(Persona,{through:EquipoPersona,foreignKey:'idEquipo',otherKey: 'idPersona'})
        Persona.belongsToMany(Equipo,{through:EquipoPersona,foreignKey:'idPersona',otherKey:'idEquipo'})
        
        Persona.belongsToMany(Jornada,{through:PersonaJornada,foreignKey:'idPersona'})
        Jornada.belongsToMany(Persona,{through:PersonaJornada,foreignKey:'idJornada'})

        Equipo.hasMany(Jornada,{sourceKey: 'idEquipo', foreignKey: 'idEquipo'})
        
    }
}