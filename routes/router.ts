import { Router, Request, Response } from "express";
import Server from "../clasess/server";
import { GraficaData } from "../clasess/grafica";

const router = Router();
const grafica = new GraficaData();

router.get('/mensajes', (req: Request, res: Response)=>{
    res.json({
        success: true,
        mensaje: '¡¡¡Hola Mundo GET!!!'
    });
});

router.post('/mensajes', (req: Request, res: Response)=>{
    const from = req.body.from;
    const body = req.body.body;
    
    res.json({
        success: true,
        from,
        body
    });
});

router.post('/mensajes/:id', (req: Request, res: Response)=>{
    const from = req.body.name;
    const body = req.body.body;
    const id = req.params.id;
    res.json({
        success: true,
        from,
        body,
        id
    });
});

router.get('/grafica', (req: Request, res: Response)=>{
    res.json(grafica.getDataGrafica());
});

router.post('/grafica', (req: Request, res: Response)=>{
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);
    grafica.incrementarValor(mes, unidades);
    const server = Server.instance;
    server.io.emit('cambio-grafica')
    res.json(grafica.getDataGrafica());
});

export default router;