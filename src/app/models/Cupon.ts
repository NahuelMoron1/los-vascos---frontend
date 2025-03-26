export class Cupon {
    id: string;
    code: string;
    percentage: number;
    expires: Date;
    used: boolean;
    minimum: number;

    constructor(id: string, code: string, percentage: number, expires: Date, used: boolean, minimum: number){
        this.id = id;
        this.code = code;
        this.percentage = percentage;
        this.expires = expires;
        this.used = used;
        this.minimum = minimum;
    }
}