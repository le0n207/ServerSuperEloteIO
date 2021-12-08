import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../clasess/usuarios-lista';
import { Usuario } from '../clasess/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server)=>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar( usuario );
}

export const configurarUsuario = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('configurar-usuario', (payload: {nombre: string, idoneSignal: string, coordenadas:any, rol:any}, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        usuariosConectados.actualizarIdOneSignal(cliente.id, payload.idoneSignal);
        usuariosConectados.actualizarCoors(cliente.id, payload.coordenadas);
        if(payload.rol == '1'){
            usuariosConectados.actualizarRol(cliente.id, payload.rol);
        }

        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            success: true,
            mensaje: `Usuario ${payload.nombre}, configurado`,
            id: cliente.id
        });
    }); 
}

export const coordenadasCarritoEOLD = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('CoordenadasCarritoE', (payload: {coordenadas:any}) => {
        console.log('CordenadasCarrito', payload);
        io.emit('coordenadas-nuevas', payload);
    }); 
}

export const coordenadasCarritoE = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('CoordenadasCarritoE', (payload: {coordenadas:any})=>{
        io.emit('coordenadas-nuevas', usuariosConectados.getUsuariosSala('1'));
    });
}

export const getCoordenadas = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('getCoordenadas', ()=>{
        io.to(cliente.id).emit('coordenadas-nuevas', usuariosConectados.getUsuariosSala('1'));
    });
}

export const getUpdateCarrito = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('getUpdateCarrito', (payload: {id: any})=>{
        io.to(payload.id).emit('update-carrito', {});
    });
}

export const CambioProductos = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('CambioProductos', (payload: {coordenadas:any}) => {
        console.log('CambioProductos', payload);
        io.emit('CambioProductos-Actualizado', payload);
    }); 
}
export const NuevaOrden = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('NuevaOrden', (payload: {coordenadas:any}) => {
        console.log('NuevaOrden', payload);
        io.emit('NuevaOrden-Actualizado', payload);
        /*callback({
            success: true,
            mensaje: `Coordenadas carrito actualizadas`
        });*/
    }); 
}

export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('obtener-usuarios', ()=>{
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}

export const desconectar = (cliente: Socket, io: socketIO.Server) =>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

export const mensaje = ( cliente: Socket, io: socketIO.Server) =>{
    cliente.on('mensaje', (payload: { from: string, body: string })=>{
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
}