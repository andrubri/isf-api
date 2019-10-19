import {DataType, DataTypes, Sequelize} from "sequelize";
import {IDataConfiguration} from "../configurations";
import {Usuario} from "./usuario";
import {Equipo} from "./equipo";
import {EquipoPersona} from "./equipo_persona";
import { Jornada } from "./jornada";


export class DBSquelize {
    private sequelize: Sequelize;

    constructor(config: IDataConfiguration) {
        this.sequelize = new Sequelize(config.connection.database, config.connection.user, config.connection.password, {
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

    private initEquipoPersona() {
        EquipoPersona.init({
            idEquipoPersona: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            idEquipo: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            idPersona: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            idRol: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            fechaBaja: {
                allowNull: true,
                type: new DataTypes.DATE(),
            }
        }, {
            sequelize: this.sequelize,
            tableName: "equipos_personas",
            timestamps: false
        });
    }

    private initEquipo() {
        Equipo.init({
            direccion: {
                allowNull: false,
                type: new DataTypes.STRING(255),
            },
            fechaBaja: {
                allowNull: true,
                type: new DataTypes.DATE(),
            },
            idLocalidad: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            idEquipo: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            nombre: {
                allowNull: false,
                type: new DataTypes.STRING(255),
            },
        }, {
            sequelize: this.sequelize,
            tableName: "equipos",
            timestamps: false
        });
    }

    private initUsuario() {
        Usuario.init({
            apellido: {
                allowNull: false,
                type: new DataTypes.STRING(255),
            },
            email: {
                allowNull: false,
                type: new DataTypes.STRING(255),
            },
            fechaBaja: {
                allowNull: true,
                type: new DataTypes.DATE(),
            },
            idperfil: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            idPersona: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            idusuario: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            nombre: {
                allowNull: false,
                type: new DataTypes.STRING(255),
            },
            token: {
                allowNull: false,
                type: new DataTypes.STRING(100),
            },
        }, {
            sequelize: this.sequelize,
            tableName: "usuarios",
            timestamps: false
        });

    }

    private initJornadas() {
        Jornada.init({idJornadas: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
            },
            direccion: {
                allowNull: false,
                type: new DataTypes.STRING(255),
            },
            descripcion: {
                allowNull: false,
                type: new DataTypes.STRING(255),
            },
            fecha: {
                allowNull: true,
                type: new DataTypes.DATE(),
            },
            idEquipo: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
        }, {
            sequelize: this.sequelize,
            tableName: "jornadas",
            timestamps: false
        });
    }

}
