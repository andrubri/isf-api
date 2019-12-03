import {Model, UUIDV4} from "sequelize";
import {DataTypes} from "sequelize";

export class HashConfirmacion extends Model {
    public idHashConfirmacion: string;
    public idJornada: number;
    public idPersona: number;
    public fechaEnvio: Date;
    public fechaConfirmacion?: Date;
}

export function initHashConfirmacion(sequelize) {
    HashConfirmacion.init({
        idHashConfirmacion: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
        },
        idJornada: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        idPersona: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        fechaEnvio: {
            allowNull: true,
            type: new DataTypes.DATE(),
        },
        fechaConfirmacion: {
            allowNull:true,
            type: new DataTypes.DATE(),
        }
    }, {
        sequelize: sequelize,
        tableName: "Hash_Confirmacion",
        timestamps: false
    });

}
