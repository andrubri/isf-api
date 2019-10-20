import {Model} from "sequelize";
import {DataTypes} from "sequelize";

export class ContactoEmergencia extends Model {
    public idContactoEmergencia: number;
    public idPersona: number;
    public nombre: string;
    public apellido: string;
    public telefono: string;
    public relacion: string;
    
}

export function initContactoEmergencia(sequelize) {
    ContactoEmergencia.init({
        idContactoEmergencia: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        idPersona: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        nombre: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        apellido: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        telefono: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
        relacion: {
            allowNull: true,
            type: new DataTypes.STRING(255),
        },
    }, {
        sequelize: sequelize,
        tableName: "contactos_emergencias",
        timestamps: false
    });

}
