import { Usuario } from "./usuario";

export class UsuariosLista{
    private lista: Usuario[] = [];
    

    constructor(){}

    public agregar(usuario: Usuario){
        this.lista.push(usuario);
        console.log( this.lista );
        return usuario;
    }

    public actualizarRol(id: string, rol: string){
        let usuario_old = '';
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario_old = usuario.nombre;
                usuario.sala = rol;
                break;
            }
        }
        console.log('El usuario ' + usuario_old + ' cambio su rol a: '+ rol);
        console.log(this.lista);
    }

    public actualizarNombre(id: string, nombre: string){
        let usuario_old = '';
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario_old = usuario.nombre;
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('El usuario ' + usuario_old + ' cambio su nombre a: '+ nombre);
        console.log(this.lista);
    }
    
    public actualizarIdOneSignal(id: string, idoneSignal: string){
        let usuario_old = '';
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario_old = usuario.nombre;
                usuario.idoneSignal = idoneSignal;
                break;
            }
        }
        console.log('El usuario ' + usuario_old + ' cambio su idoneSignal a: '+ idoneSignal);
        console.log(this.lista);
    }

    public actualizarCoors(id: string, coors: string){
        let usuario_old = '';
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario_old = usuario.nombre;
                usuario.coordenadas = coors;
                break;
            }
        }
        console.log('El usuario ' + usuario_old + ' cambio sus coordenadas a: '+ coors);
        console.log(this.lista);
    }

    public getLista(){
        return this.lista.filter(
            usuario => usuario.nombre !== 'sin-nombre'
        );
    }

    public getUsuario(id: string){
        return this.lista.filter(
            usuario => usuario.id === id
        );
    }

    public getUsuariosSala(sala: string){
        /*return this.lista.filter(
            usuario => usuario.sala === sala
        );*/

        for (let usuario of this.lista) {
            if (usuario.sala === sala) {
                return usuario.coordenadas;
                //break;
            }
        }
    }

    public borrarUsuario(id: string){
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(
            usuario => usuario.id !== id
        );
        return tempUsuario;
    }
}

