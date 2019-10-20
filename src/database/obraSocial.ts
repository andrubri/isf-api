import {Model} from "sequelize";
import {DataTypes} from "sequelize";

export class ObraSocial extends Model {
    public idObraSocial: number;
    public empresa: string;
    public plan: string;
    
}

export function initObraSocial(sequelize) {
    ObraSocial.init({
        idObraSocial: {
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        empresa: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        plan: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "obras_sociales",
        timestamps: false
    });

}
