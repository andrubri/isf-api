import {Model} from "sequelize";

export class ActividadesVoluntarios extends Model {
    public idActividadVoluntario: number;
    public idActividad: number;
    public idVoluntario: number;
    public idRol: number;
    public fechaBaja: Date;
}
