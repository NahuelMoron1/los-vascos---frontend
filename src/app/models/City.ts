import { Province } from "./Province";

export class City{
    nombre: string;
    provincia: Province;
    constructor(nombre: string, provincia: Province){
        this.nombre = nombre;
        this.provincia = provincia;
    }
}