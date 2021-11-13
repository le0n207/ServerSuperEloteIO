
import bodyParser, { json } from "body-parser";
import Server from "./clasess/server";
import router from "./routes/router";
import cors from 'cors';

//Se crea una instancia
const server = Server.instance;

//Parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//CORS
server.app.use(cors({origin: true, credentials: true}));

//RUTAS
server.app.use('/', router);

//LLAMADO DEL SERVICIO
server.start(()=>{
        console.log(`Sever Started ${server.port }`);
    }
)