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

        // Aplicar los cambios a la db
        this.sequelize.sync({alter : true});
    }

}
