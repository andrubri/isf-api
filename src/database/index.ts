import {DataType, DataTypes, Sequelize} from "sequelize";
import {IDataConfiguration} from "../configurations";
import {initUsuario, Usuario} from "./entidades/usuario";
import {initEquipo, Equipo} from "./entidades/equipo";
import {EquipoPersona, initEquipoPersona} from "./entidades/equipo_persona";
import {initJornada, Jornada} from "./entidades/jornada";
import {initPersona, Persona} from "./entidades/persona";
import {ContactoEmergencia, initContactoEmergencia} from "./entidades/contactoEmergencia";
import {DatosSeguro, initDatosSeguro} from "./entidades/datosSeguro";
import {initObraSocial} from "./entidades/obraSocial";
import {initPerfil, Perfil} from "./entidades/perfil";
import {initOrigenContacto} from "./entidades/origenContacto";
import {initRol, Rol} from "./entidades/rol";
import {initMedioTransporte, MedioTransporte} from "./entidades/medioTransporte";
import {initPersonaJornada, PersonaJornada} from "./entidades/personas_jornada";
import {initHashConfirmacion} from "./entidades/hashConfirmacion";

export class DBSquelize {
    private static sequelize: Sequelize = null;

    constructor(config: IDataConfiguration) {
        if (DBSquelize.sequelize == null) {
            DBSquelize.sequelize = new Sequelize(config.connection.database, config.connection.user, config.connection.password, {
                dialect: config.connection.dialect,
                host: config.connection.host,
                logging: true,
            });

            // Iinicio las entidades
            initUsuario(DBSquelize.sequelize);
            initEquipo(DBSquelize.sequelize);
            initJornada(DBSquelize.sequelize);
            initEquipoPersona(DBSquelize.sequelize);
            initPersona(DBSquelize.sequelize);
            initContactoEmergencia(DBSquelize.sequelize);
            initDatosSeguro(DBSquelize.sequelize);
            initObraSocial(DBSquelize.sequelize);
            initPerfil(DBSquelize.sequelize);
            initMedioTransporte(DBSquelize.sequelize);
            initOrigenContacto(DBSquelize.sequelize);
            initRol(DBSquelize.sequelize);
            initPersonaJornada(DBSquelize.sequelize);
            initHashConfirmacion(DBSquelize.sequelize);

            this.createRelations();

            // Aplicar los cambios a la db
            // DBSquelize.sequelize.sync({alter: true});
        }
    }

    public async execute(query: string): Promise<any>;
    public async execute(query: string, options: any): Promise<any>;

    public async execute(query: string, options?: any): Promise<any> {
        if (options) {
            return await DBSquelize.sequelize.query(query, options);
        } else {
            return await DBSquelize.sequelize.query(query);
        }
    }

    private createRelations(): void {
        Usuario.belongsTo(Persona, {foreignKey: 'idPersona', constraints: false});
        Persona.hasOne(Usuario, {foreignKey: 'idPersona'});

        Usuario.belongsTo(Perfil, {foreignKey: 'idPerfil'});
        Perfil.hasOne(Usuario, {foreignKey: 'idPerfil'});

        Equipo.belongsToMany(Persona, {through: EquipoPersona, foreignKey: 'idEquipo', otherKey: 'idPersona'});
        Persona.belongsToMany(Equipo, {through: EquipoPersona, foreignKey: 'idPersona', otherKey: 'idEquipo'});

        Persona.belongsToMany(Jornada, {through: PersonaJornada, foreignKey: 'idPersona'});
        Jornada.belongsToMany(Persona, {through: PersonaJornada, foreignKey: 'idJornada'});

        PersonaJornada.hasOne(Jornada, {foreignKey: 'idJornadas', sourceKey: 'idJornada'});

        PersonaJornada.hasOne(Persona, {foreignKey: 'idPersona', sourceKey: 'idPersona'});

        PersonaJornada.hasOne(MedioTransporte, {foreignKey: 'idMedioTransporte', sourceKey: 'idMedioTransporte'});

        Equipo.hasMany(Jornada, {sourceKey: 'idEquipo', foreignKey: 'idEquipo'});
        Jornada.belongsTo(Equipo, {foreignKey: 'idEquipo'});

        Persona.hasOne(ContactoEmergencia, {foreignKey: 'idPersona'});
        ContactoEmergencia.belongsTo(Persona, {foreignKey: 'idPersona'});

        Persona.hasOne(DatosSeguro, {foreignKey: 'idPersona'});
        DatosSeguro.belongsTo(Persona, {foreignKey: 'idPersona'});

    }

}