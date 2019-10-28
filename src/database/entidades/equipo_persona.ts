import {Model,DataTypes} from "sequelize";

export class EquipoPersona extends Model {
    public idEquipoPersona: number;
    public idEquipo: number;
    public idPersona: number;
    public idRol: number;
    
}


export function initEquipoPersona(sequelize) {
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
        }
    }, {
        sequelize: sequelize,
        tableName: "equipos_personas",
        timestamps: false
    });
}
