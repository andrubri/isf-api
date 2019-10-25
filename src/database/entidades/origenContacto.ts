import {Model} from "sequelize";
import {DataTypes} from "sequelize";

export class OrigenContacto extends Model {
    public idOrigenContacto: number;
    public descripcion: string;
    
}

export function initOrigenContacto(sequelize) {
    OrigenContacto.init({
        idOrigenContacto: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        descripcion: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "origenes_contactos",
        timestamps: false
    });

}
