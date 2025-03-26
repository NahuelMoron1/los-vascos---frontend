export class UserXcoupon{
    id: string;
    userID: string;
    couponID: string;

    constructor(id: string, userID: string, couponID: string){
        this.id = id;
        this.userID = userID;
        this.couponID = couponID;
    }
}