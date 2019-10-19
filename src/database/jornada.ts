import {Model} from "sequelize";

export class Jornada extends Model {
    public idJornada: number;
    public idEquipo: number;
    public descripcion: string;
    public direccion: string;
    public fecha: Date;
}
