"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var server_1 = __importDefault(require("./clasess/server"));
var router_1 = __importDefault(require("./routes/router"));
var cors_1 = __importDefault(require("cors"));
//Se crea una instancia
var server = server_1.default.instance;
//Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//CORS
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//RUTAS
server.app.use('/', router_1.default);
//LLAMADO DEL SERVICIO
server.start(function () {
    console.log("Sever Started " + server.port);
});
