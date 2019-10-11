import {Model} from "sequelize";

export class Actividad extends Model {
    public idActividad: number;
    public nombre: string;
    public direccion: string;
    public idLocalidad: number;
    public fechaBaja: Date;
}
