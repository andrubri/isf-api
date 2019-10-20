import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import {Persona} from "../../database/persona";
import {OrigenContacto} from "../../database/origenContacto";
import {ContactoEmergencia} from "../../database/contactoEmergencia";
import { DatosSeguro } from "../../database/datosSeguro";
import { ObraSocial} from "../../database/obraSocial";
import {IRequest, IReqPersona} from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import UpdateRequest = admin.auth.UpdateRequest;

export default class PersonaController {
    private configs: IServerConfigurations;
    private firebaseAdmin: any;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;

        this.firebaseAdmin = FirebaseAdmin.get();
    }

    public async obtenerPersonas(request: IRequest, response: Hapi.ResponseToolkit): Promise<Persona[]> {
        const result: Persona[] = await Persona.findAll();
        return result;
    }


    public async crearPersona(request: IReqPersona, response: Hapi.ResponseToolkit) {
        //const exist: Persona = await Persona.findOne({where: {idPersona: request.payload.id}});
        if (true) {
            /* const personaFireBase: any = await this.firebaseAdmin.auth().createPersona({
                descripcion: request.payload.descripcion,
                fecha: request.payload.fecha,
                direccion: request.payload.direccion,
                idEquipo: request.payload.idEquipo,
            }); */

            const persona: Persona = await Persona.create({
               nombre              :  request.payload.persona.nombre,
               apellido            :  request.payload.persona.apellido,
               idExterno           :  request.payload.persona.idExterno,
               tipoDocumento       :  request.payload.persona.tipoDocumento,
               idDocumento         :  request.payload.persona.idDocumento,
               paisOrigen          :  request.payload.persona.paisOrigen,
               paisResidencia      :  request.payload.persona.paisResidencia,
               provinciaResidencia :  request.payload.persona.provinciaResidencia,
               ciudadResidencia    :  request.payload.persona.ciudadResidencia,
               telefono            :  request.payload.persona.telefono, 
               email               :  request.payload.persona.email,
               nivelEstudios       :  request.payload.persona.nivelEstudios,
               carrera             :  request.payload.persona.carrera,
               universidad         :  request.payload.persona.universidad,
               ocupacion           :  request.payload.persona.ocupacion, 
               comentarios         :  request.payload.persona.comentarios,
               estado              :  request.payload.persona.estado,
               dieta               :  request.payload.persona.dieta,
               fechaNacimiento     :  request.payload.persona.fechaNacimiento,
               idOrigenContacto    :  request.payload.persona.idOrigenContacto,
            });

            const origenContacto: OrigenContacto = await OrigenContacto.create({
               descripcion              :  request.payload.origenContacto.descripcion,
            });

            const contactoEmergencia: ContactoEmergencia = await ContactoEmergencia.create({
                idPersona             :  request.payload.contactoEmergencia.idPersona,
                nombre                :  request.payload.contactoEmergencia.nombre ,
                apellido              :  request.payload.contactoEmergencia.apellido,
                relacion              :  request.payload.contactoEmergencia.relacion,
                telefono              :  request.payload.contactoEmergencia.telefono
            });
            const datosSeguro: DatosSeguro = await DatosSeguro.create({
                idObraSocial   : request.payload.datosSeguro.idObraSocial,
                emfermedades   : request.payload.datosSeguro.emfermedades,
                grupoSanguineo : request.payload.datosSeguro.grupoSanguineo,
                medicaciones   : request.payload.datosSeguro.medicaciones


            });
            const obraSocial: ObraSocial = await ObraSocial.create({
                empresa   : request.payload.obraSocial.empresa,
                plan : request.payload.obraSocial.plan,

            });

            return {
                persona:persona,
                datosSeguro:datosSeguro,
                obraSocial:obraSocial,
                origenContacto: origenContacto
            };
        } else {
                return response.response("El Persona ya existe").code(400);
            }
        }
    

    public async actualizarPersona(request: IReqPersona, response: Hapi.ResponseToolkit) {
        const exist: Persona = await Persona.findOne({where: {idPersona: request.params.id}});
        if (exist) {
            try {
                const [cont, persona] = await Persona.update({
                    nombre              :  request.payload.persona.nombre,
                    apellido            :  request.payload.persona.apellido,
                    idExterno           :  request.payload.persona.idExterno,
                    tipoDocumento       :  request.payload.persona.tipoDocumento,
                    idDocumento         :  request.payload.persona.idDocumento,
                    paisOrigen          :  request.payload.persona.paisOrigen,
                    paisResidencia      :  request.payload.persona.paisResidencia,
                    provinciaResidencia :  request.payload.persona.provinciaResidencia,
                    ciudadResidencia    :  request.payload.persona.ciudadResidencia,
                    telefono            :  request.payload.persona.telefono, 
                    email               :  request.payload.persona.email,
                    nivelEstudios       :  request.payload.persona.nivelEstudios,
                    carrera             :  request.payload.persona.carrera,
                    universidad         :  request.payload.persona.universidad,
                    ocupacion           :  request.payload.persona.ocupacion, 
                    comentarios         :  request.payload.persona.comentarios,
                    estado              :  request.payload.persona.estado,
                    dieta               :  request.payload.persona.dieta,
                    fechaNacimiento     :  request.payload.persona.fechaNacimiento,
                    idOrigenContacto    :  request.payload.persona.idOrigenContacto,
                }, {where: {idPersona: request.params.id}});

    
                return await Persona.findOne({where: {idPersona: request.params.id}});
            } catch (e) {
                return e;
            }
        } else {
            return response.response().code(400);
        }
    }

    public async eliminarPersona(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Persona = await Persona.findOne({where: {idPersona: request.params.id}});
        if (exist) {
           /*  const [cont, persona] = await Persona.update({
                fechaBaja: new Date()
            }, {where: {idPersona: request.params.id}});
 */
            await Persona.destroy({where: {idPersona: request.params.id}});

            return exist;
            //return await Persona.findOne({where: {idPersona: request.params.id}});
        } else {
            return response.response().code(400);
        }
    }

}
