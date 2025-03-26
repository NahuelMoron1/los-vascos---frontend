export class Feature{
    id: string;
    product_id: string;
    name: string;
    value: string;
    constructor(id: string, name: string, value: string, product_id: string){
        this.id = id;
        this.name = name;
        this.value = value;
        this.product_id = product_id;
    }
}