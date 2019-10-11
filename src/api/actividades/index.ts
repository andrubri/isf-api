import * as Hapi from "hapi";
import * as socketio from "socket.io";
import { IServerConfigurations } from "../../configurations";
import Routes from "./routes";

export function init(server: Hapi.Server, io: socketio.Server , configs: IServerConfigurations) {
    Routes(server, io, configs);
}
