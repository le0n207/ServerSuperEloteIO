import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';
//
export default class Server{
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;
   

    //Define lo que se ejecuta al principio al correr el proyecto
    // es privado para que no se pueda acceder a el desde ningun lugar, pero si mediante la instancia
    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.listenSockets();
    }

    public static get instance(){
        //Si no hay una instancia significa que no hay cliente conectado y hay que crear una
        return this._instance || (this._instance = new this());
    }

    private listenSockets(){
        console.log("Listening...");
        this.io.on('connection', cliente =>{
            console.log('Cliente conectado');
            socket.conectarCliente(cliente, this.io);
            socket.configurarUsuario(cliente, this.io);
            socket.obtenerUsuarios(cliente, this.io);
            socket.mensaje(cliente, this.io);
            socket.coordenadasCarritoE(cliente, this.io);
            socket.getCoordenadas(cliente, this.io);
            socket.getUpdateCarrito(cliente, this.io);
            socket.CambioProductos(cliente, this.io);
            socket.NuevaOrden(cliente, this.io);
            socket.desconectar(cliente, this.io);
        });
    }

    start( callback: any){
        this.httpServer.listen(this.port, callback);
    }

}