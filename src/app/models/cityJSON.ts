import { City } from "./City";

export class cityJSON{
    cantidad: number;
    localidades: Array<City>;
    constructor(cantidad: number, localidades: Array<City>){
        this.cantidad = cantidad;
        this.localidades = localidades;
    }
}