"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server_1 = __importDefault(require("../clasess/server"));
var grafica_1 = require("../clasess/grafica");
var router = (0, express_1.Router)();
var grafica = new grafica_1.GraficaData();
router.get('/mensajes', function (req, res) {
    res.json({
        success: true,
        mensaje: '¡¡¡Hola Mundo GET!!!'
    });
});
router.post('/mensajes', function (req, res) {
    var from = req.body.from;
    var body = req.body.body;
    res.json({
        success: true,
        from: from,
        body: body
    });
});
router.post('/mensajes/:id', function (req, res) {
    var from = req.body.name;
    var body = req.body.body;
    var id = req.params.id;
    res.json({
        success: true,
        from: from,
        body: body,
        id: id
    });
});
router.get('/grafica', function (req, res) {
    res.json(grafica.getDataGrafica());
});
router.post('/grafica', function (req, res) {
    var mes = req.body.mes;
    var unidades = Number(req.body.unidades);
    grafica.incrementarValor(mes, unidades);
    var server = server_1.default.instance;
    server.io.emit('cambio-grafica');
    res.json(grafica.getDataGrafica());
});
exports.default = router;
