import {Model} from "sequelize";

export class Equipo extends Model {
    public idEquipo: number;
    public nombre: string;
    public direccion: string;
    public idLocalidad: number;
    public fechaBaja: Date;
}
