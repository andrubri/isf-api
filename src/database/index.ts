import {DataType, DataTypes, Sequelize} from "sequelize";
import {IDataConfiguration} from "../configurations";
import {initUsuario} from "./usuario";
import {initEquipo} from "./equipo";
import {initEquipoPersona} from "./equipo_persona";
import { initJornada } from "./jornada";
import { initPersona } from "./persona";


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

        // Aplicar los cambios a la db
        this.sequelize.sync({alter : true});
    }

}
