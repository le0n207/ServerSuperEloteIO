"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
var UsuariosLista = /** @class */ (function () {
    function UsuariosLista() {
        this.lista = [];
    }
    UsuariosLista.prototype.agregar = function (usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    };
    UsuariosLista.prototype.actualizarRol = function (id, rol) {
        var usuario_old = '';
        for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.id === id) {
                usuario_old = usuario.nombre;
                usuario.sala = rol;
                break;
            }
        }
        console.log('El usuario ' + usuario_old + ' cambio su rol a: ' + rol);
        console.log(this.lista);
    };
    UsuariosLista.prototype.actualizarNombre = function (id, nombre) {
        var usuario_old = '';
        for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.id === id) {
                usuario_old = usuario.nombre;
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('El usuario ' + usuario_old + ' cambio su nombre a: ' + nombre);
        console.log(this.lista);
    };
    UsuariosLista.prototype.actualizarCoors = function (id, coors) {
        var usuario_old = '';
        for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.id === id) {
                usuario_old = usuario.nombre;
                usuario.coordenadas = coors;
                break;
            }
        }
        console.log('El usuario ' + usuario_old + ' cambio sus coordenadas a: ' + coors);
        console.log(this.lista);
    };
    UsuariosLista.prototype.getLista = function () {
        return this.lista.filter(function (usuario) { return usuario.nombre !== 'sin-nombre'; });
    };
    UsuariosLista.prototype.getUsuario = function (id) {
        return this.lista.filter(function (usuario) { return usuario.id === id; });
    };
    UsuariosLista.prototype.getUsuariosSala = function (sala) {
        /*return this.lista.filter(
            usuario => usuario.sala === sala
        );*/
        for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.sala === sala) {
                return usuario.coordenadas;
                //break;
            }
        }
    };
    UsuariosLista.prototype.borrarUsuario = function (id) {
        var tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(function (usuario) { return usuario.id !== id; });
        return tempUsuario;
    };
    return UsuariosLista;
}());
exports.UsuariosLista = UsuariosLista;
