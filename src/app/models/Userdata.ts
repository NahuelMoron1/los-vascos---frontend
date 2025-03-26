export class Userdata{
    id: string;
    firstname: string;
    lastname: string;
    company: string;
    phone: string;
    email: string;
    country: string;
    province: string;
    city: string;
    street: string;
    streetNumb: number;
    userID: string;
    saveIt: string;

    constructor(id: string, firstname: string, lastname: string, company: string, phone: string, email: string, country: string, province: string, city: string, street: string, streetNumb: number, userID: string, saveIt: string){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.company = company;
        this.phone = phone;
        this.email = email;
        this.country = country;
        this.province = province;
        this.city = city;
        this.street = street;
        this.streetNumb = streetNumb;
        this.userID = userID;
        this.saveIt = saveIt;
    }
}