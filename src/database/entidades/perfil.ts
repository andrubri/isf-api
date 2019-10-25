import {Model} from "sequelize";
import {DataTypes} from "sequelize";

export class Perfil extends Model {
    public idPerfil: number;
    public codigo: string;
    public descripcion: string;
    
}

export function initPerfil(sequelize) {
    Perfil.init({
        idPerfil: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        codigo: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        descripcion: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "perfiles",
        timestamps: false
    });

}
