import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import {Jornada} from "../../database/jornada";
import {IRequest, IReqJornada} from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import UpdateRequest = admin.auth.UpdateRequest;

export default class JornadaController {
    private configs: IServerConfigurations;
    private firebaseAdmin: any;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;

        this.firebaseAdmin = FirebaseAdmin.get();
    }

    public async obtenerJornadas(request: IRequest, response: Hapi.ResponseToolkit): Promise<Jornada[]> {
        const result: Jornada[] = await Jornada.findAll();
        return result;
    }


    public async crearJornada(request: IReqJornada, response: Hapi.ResponseToolkit) {
        //const exist: Jornada = await Jornada.findOne({where: {idJornada: request.payload.id}});
        if (true) {
            /* const jornadaFireBase: any = await this.firebaseAdmin.auth().createJornada({
                descripcion: request.payload.descripcion,
                fecha: request.payload.fecha,
                direccion: request.payload.direccion,
                idEquipo: request.payload.idEquipo,
            }); */

            const jornada: Jornada = await Jornada.create({
               descripcion: request.payload.descripcion,
                fecha: request.payload.fecha,
                direccion: request.payload.direccion,
                idEquipo: request.payload.idEquipo,
            });

            return jornada;
        } else {
                return response.response("El Jornada ya existe").code(400);
            }
        }
    

    public async actualizarJornada(request: IReqJornada, response: Hapi.ResponseToolkit) {
        const exist: Jornada = await Jornada.findOne({where: {idJornadas: request.params.id}});
        if (exist) {
            try {
                const [cont, jornada] = await Jornada.update({
                    descripcion: request.payload.descripcion,
                    fecha: request.payload.fecha,
                    idEquipo: request.payload.idEquipo,
                    direccion: request.payload.direccion,
                }, {where: {idJornadas: request.params.id}});

    
                return await Jornada.findOne({where: {idJornadas: request.params.id}});
            } catch (e) {
                return e;
            }
        } else {
            return response.response().code(400);
        }
    }

    public async eliminarJornada(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Jornada = await Jornada.findOne({where: {idJornadas: request.params.id}});
        if (exist) {
           /*  const [cont, jornada] = await Jornada.update({
                fechaBaja: new Date()
            }, {where: {idJornada: request.params.id}});
 */
            await Jornada.destroy({where: {idJornadas: request.params.id}});

            return exist;
            //return await Jornada.findOne({where: {idJornada: request.params.id}});
        } else {
            return response.response().code(400);
        }
    }

}
