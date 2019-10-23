import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import { IServerConfigurations } from "../../configurations";
import { PersonaJornada } from "../../database/personas_jornada";
import { IRequest, IReqPersonaJornada } from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import UpdateRequest = admin.auth.UpdateRequest;
import { Jornada } from "../../database/jornada";
import { Persona } from "../../database/persona";

export default class PersonaJornadaController {
    private configs: IServerConfigurations;
    private firebaseAdmin: any;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;

        this.firebaseAdmin = FirebaseAdmin.get();
    }


    public async crearPersonaJornada(request: IReqPersonaJornada, response: Hapi.ResponseToolkit) {

        const foundJornda: Jornada = await Jornada.findOne({ where: { idJornadas: request.payload.idJornada } });
        const foundPersona: Persona = await Persona.findOne({ where: { idPersona: request.payload.idPersona } });

        const foundPersonaJornada: PersonaJornada = await PersonaJornada.findOne(
            { where: { idJornada: request.payload.idJornada, idPersona: request.payload.idPersona } });

        if (!foundJornda) {
            return response.response("La jornada con ese id no existe").code(400);
        }

        if (!foundPersona) {
            return response.response("La Persona con ese id no existe").code(400);
        }
        if (foundPersonaJornada) {
            return response.response("La Persona ya esta adherida a esa jornada").code(400);
        }

        const jornada: PersonaJornada = await PersonaJornada.create({
            idJornada: request.payload.idJornada,
            idPersona: request.payload.idPersona,
            idMedioTransporte: request.payload.idMedioTransporte,
            asistencia: request.payload.asistencia,
            direccionOrigen: request.payload.direccionOrigen,
            confirmacion: request.payload.confirmacion,
        });

        return jornada;

    }




    public async eliminarPersonaJornada(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: PersonaJornada = await PersonaJornada.findOne({ where: { idPersonaJornadas: request.params.id } });
        if (exist) {
            await PersonaJornada.destroy({ where: { idPersonaJornadas: request.params.id } });
            return exist;
        } else {
            return response.response().code(400);
        }
    }

}
