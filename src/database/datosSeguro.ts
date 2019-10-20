import {Model} from "sequelize";
import {DataTypes} from "sequelize";

export class DatosSeguro extends Model {
    public idDatosSeguro: number;
    public grupoSanguineo: string;
    public emfermedades: string;
    public medicaciones: string;
    public idOrigenContacto: number;
    
}

export function initDatosSeguro(sequelize) {
    DatosSeguro.init({
        idDatosSeguro: {
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        grupoSanguineo: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        emfermedades: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        medicaciones: {
            type: new DataTypes.STRING(255),
        },
        idOrigenContacto: {
            allowNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
    }, {
        sequelize: sequelize,
        tableName: "datos_seguro",
        timestamps: false
    });

}
