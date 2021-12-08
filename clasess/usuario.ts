export class Usuario {

    public id: string;
    public nombre: string;
    public sala: string;    
    public coordenadas: string;    
    public idoneSignal: string;    

    constructor(id: string){
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = '0';
        this.coordenadas = 'sin-coordenadas';
        this.idoneSignal = '';
    }
}