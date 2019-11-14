import {Model} from "sequelize";
import {DataTypes} from "sequelize";

export class DatosSeguro extends Model {
    public idDatosSeguro: number;
    public grupoSanguineo: string;
    public emfermedades: string;
    public medicaciones: string;
    public idObraSocial: number;
    
}

export function initDatosSeguro(sequelize) {
    DatosSeguro.init({
        idDatosSeguro: {
            autoIncrement:  true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        grupoSanguineo: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        idPersona: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        emfermedades: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        medicaciones: {
            allowNull:true,
            type: new DataTypes.STRING(255),
        },
        idObraSocial: {
            allowNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
    }, {
        sequelize: sequelize,
        tableName: "datos_seguro",
        timestamps: false
    });

}
