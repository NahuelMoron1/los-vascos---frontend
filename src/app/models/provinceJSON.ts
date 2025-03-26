import { Province } from "./Province";

export class ProvinceJSON{
    cantidad: number;
    inicio: number;
    parametros: Array<any>;
    provincias: Array<Province>;
    total: number;

    constructor(cantidad: number, inicio: number, parametros: Array<any>, provincias: Array<Province>, total: number){
        this.cantidad = cantidad;
        this.inicio = inicio;
        this.parametros = parametros;
        this.provincias = provincias;
        this.total = total;
    }
}