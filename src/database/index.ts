import {DataType, DataTypes, Sequelize} from "sequelize";
import {IDataConfiguration} from "../configurations";
import {Usuario} from "./usuario";
import {Actividad} from "./actividad";
import {ActividadesVoluntarios} from "./actividades_voluntarios";

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
        this.initActividad();
        this.initActividadVoluntario();
    }

    private initActividadVoluntario() {
        ActividadesVoluntarios.init({
            idActividadVoluntario: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            idActividad: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            idVoluntario: {
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
            tableName: "actividades_voluntarios",
            timestamps: false
        });
    }

    private initActividad() {
        Actividad.init({
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
            idActividad: {
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
            tableName: "actividades",
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
            idvoluntario: {
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

}
