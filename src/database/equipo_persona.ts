import {Model} from "sequelize";

export class EquipoPersona extends Model {
    public idEquipoPersona: number;
    public idEquipo: number;
    public idPersona: number;
    public idRol: number;
    public fechaBaja: Date;
}
