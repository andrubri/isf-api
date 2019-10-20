import {Model} from "sequelize";
import {DataTypes} from "sequelize";

export class Rol extends Model {
    public idRol: number;
    public representacion: string;
    public descripcion: string;
    
}

export function initRol(sequelize) {
    Rol.init({
        idRol: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        representacion: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        descripcion: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "roles",
        timestamps: false
    });

}
