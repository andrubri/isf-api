import {DataType, DataTypes, Sequelize} from "sequelize";
import {IDataConfiguration} from "../configurations";
import {Usuario} from "./usuario";

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
