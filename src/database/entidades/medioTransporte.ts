import {Model} from "sequelize";
import {DataTypes} from "sequelize";

export class MedioTransporte extends Model {
    public idMedioTransporte: number;
    public descripcion: string;
    
}

export function initMedioTransporte(sequelize) {
    MedioTransporte.init({
        idMedioTransporte: {
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
        tableName: "medios_transporte",
        timestamps: false
    });

}
