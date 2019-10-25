import {DataType, DataTypes, Sequelize} from "sequelize";
import {IDataConfiguration} from "../configurations";
import {initUsuario, Usuario} from "./entidades/usuario";
import {initEquipo, Equipo} from "./entidades/equipo";
import {EquipoPersona, initEquipoPersona} from "./entidades/equipo_persona";
import {initJornada} from "./entidades/jornada";
import {initPersona, Persona} from "./entidades/persona";
import {initContactoEmergencia} from "./entidades/contactoEmergencia";
import {initDatosSeguro} from "./entidades/datosSeguro";
import {initObraSocial} from "./entidades/obraSocial";
import {initPerfil} from "./entidades/perfil";
import {initOrigenContacto} from "./entidades/origenContacto";
import {initRol} from "./entidades/rol";
import {initMedioTransporte} from "./entidades/medioTransporte";
import {initPersonaJornada} from "./entidades/personas_jornada";


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

    createRelations(): void {
        Usuario.belongsTo(Persona, {foreignKey: 'idPersona'});

        Equipo.belongsToMany(Persona, {
            through: 'equipos_personas',
            as: 'personas',
            foreignKey: 'idEquipo',
            otherKey: 'idPersona'
        });

        Persona.belongsToMany(Persona, {
            through: 'equipos_personas',
            as: 'equipos',
            foreignKey: 'idPersona',
            otherKey: 'idEquipo'
        });
        Persona.hasOne(Usuario, {sourceKey: 'idPersona', foreignKey: 'idPersona'});

        EquipoPersona.belongsTo(Persona, {foreignKey: 'idPersona'});
        EquipoPersona.belongsTo(Equipo, {foreignKey: 'idEquipo'});
    }
}
