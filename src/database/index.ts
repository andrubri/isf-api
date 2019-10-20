import {DataType, DataTypes, Sequelize} from "sequelize";
import {IDataConfiguration} from "../configurations";
import {initUsuario} from "./usuario";
import {initEquipo} from "./equipo";
import {initEquipoPersona} from "./equipo_persona";
import { initJornada } from "./jornada";
import { initPersona } from "./persona";
import { initContactoEmergencia } from "./contactoEmergencia";
import { initDatosSeguro } from "./datosSeguro"
import { initObraSocial } from "./obraSocial";
import { initPerfil } from "./perfil";
import { initOrigenContacto } from "./origenContacto";
import { initRol } from "./rol";
import { initMedioTransporte } from "./medioTransporte";


export class DBSquelize {
    private sequelize: Sequelize;

    constructor(config: IDataConfiguration) {
        this.sequelize = new Sequelize(config.connection.database, config.connection.user, config.connection.password, {
            dialect: config.connection.dialect,
            host: config.connection.host,
            logging: false,
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

        // Aplicar los cambios a la db
        this.sequelize.sync({alter : true});
    }

}
