import {Model} from "sequelize";

export class Jornada extends Model {
    public idJornada: number;
    public idActividad: number;
    public descripcion: string;
    public direccion: string;
    public fecha: Date;
}
