"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var enviroment_1 = require("../global/enviroment");
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var socket = __importStar(require("../sockets/socket"));
//
var Server = /** @class */ (function () {
    //Define lo que se ejecuta al principio al correr el proyecto
    // es privado para que no se pueda acceder a el desde ningun lugar, pero si mediante la instancia
    function Server() {
        this.app = (0, express_1.default)();
        this.port = enviroment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = (0, socket_io_1.default)(this.httpServer);
        this.listenSockets();
    }
    Object.defineProperty(Server, "instance", {
        get: function () {
            //Si no hay una instancia significa que no hay cliente conectado y hay que crear una
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Server.prototype.listenSockets = function () {
        var _this = this;
        console.log("Listening...");
        this.io.on('connection', function (cliente) {
            console.log('Cliente conectado');
            socket.conectarCliente(cliente, _this.io);
            socket.configurarUsuario(cliente, _this.io);
            socket.obtenerUsuarios(cliente, _this.io);
            socket.mensaje(cliente, _this.io);
            socket.coordenadasCarritoE(cliente, _this.io);
            socket.getCoordenadas(cliente, _this.io);
            socket.getUpdateCarrito(cliente, _this.io);
            socket.CambioProductos(cliente, _this.io);
            socket.NuevaOrden(cliente, _this.io);
            socket.desconectar(cliente, _this.io);
        });
    };
    Server.prototype.start = function (callback) {
        this.httpServer.listen(this.port, callback);
    };
    return Server;
}());
exports.default = Server;
