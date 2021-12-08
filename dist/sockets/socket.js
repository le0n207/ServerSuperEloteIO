"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensaje = exports.desconectar = exports.obtenerUsuarios = exports.NuevaOrden = exports.CambioProductos = exports.getUpdateCarrito = exports.getCoordenadas = exports.coordenadasCarritoE = exports.coordenadasCarritoEOLD = exports.configurarUsuario = exports.conectarCliente = exports.usuariosConectados = void 0;
var usuarios_lista_1 = require("../clasess/usuarios-lista");
var usuario_1 = require("../clasess/usuario");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
var conectarCliente = function (cliente, io) {
    var usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
var configurarUsuario = function (cliente, io) {
    cliente.on('configurar-usuario', function (payload, callback) {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        exports.usuariosConectados.actualizarIdOneSignal(cliente.id, payload.idoneSignal);
        exports.usuariosConectados.actualizarCoors(cliente.id, payload.coordenadas);
        if (payload.rol == '1') {
            exports.usuariosConectados.actualizarRol(cliente.id, payload.rol);
        }
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            success: true,
            mensaje: "Usuario " + payload.nombre + ", configurado",
            id: cliente.id
        });
    });
};
exports.configurarUsuario = configurarUsuario;
var coordenadasCarritoEOLD = function (cliente, io) {
    cliente.on('CoordenadasCarritoE', function (payload) {
        console.log('CordenadasCarrito', payload);
        io.emit('coordenadas-nuevas', payload);
    });
};
exports.coordenadasCarritoEOLD = coordenadasCarritoEOLD;
var coordenadasCarritoE = function (cliente, io) {
    cliente.on('CoordenadasCarritoE', function (payload) {
        io.emit('coordenadas-nuevas', exports.usuariosConectados.getUsuariosSala('1'));
    });
};
exports.coordenadasCarritoE = coordenadasCarritoE;
var getCoordenadas = function (cliente, io) {
    cliente.on('getCoordenadas', function () {
        io.to(cliente.id).emit('coordenadas-nuevas', exports.usuariosConectados.getUsuariosSala('1'));
    });
};
exports.getCoordenadas = getCoordenadas;
var getUpdateCarrito = function (cliente, io) {
    cliente.on('getUpdateCarrito', function (payload) {
        io.to(payload.id).emit('update-carrito', {});
    });
};
exports.getUpdateCarrito = getUpdateCarrito;
var CambioProductos = function (cliente, io) {
    cliente.on('CambioProductos', function (payload) {
        console.log('CambioProductos', payload);
        io.emit('CambioProductos-Actualizado', payload);
    });
};
exports.CambioProductos = CambioProductos;
var NuevaOrden = function (cliente, io) {
    cliente.on('NuevaOrden', function (payload) {
        console.log('NuevaOrden', payload);
        io.emit('NuevaOrden-Actualizado', payload);
        /*callback({
            success: true,
            mensaje: `Coordenadas carrito actualizadas`
        });*/
    });
};
exports.NuevaOrden = NuevaOrden;
var obtenerUsuarios = function (cliente, io) {
    cliente.on('obtener-usuarios', function () {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
var desconectar = function (cliente, io) {
    cliente.on('disconnect', function () {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.desconectar = desconectar;
var mensaje = function (cliente, io) {
    cliente.on('mensaje', function (payload) {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
