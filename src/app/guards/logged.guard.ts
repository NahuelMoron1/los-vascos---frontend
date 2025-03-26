import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "../services/cookie.service";

export const loggedGuard = async () => {
    const router = inject(Router);
    const cookieService = inject(CookieService);
    let tokenExist = false;
    (await cookieService.tokenExistTC('access_token')).subscribe(data => {
        tokenExist = data;
    });
    if(tokenExist){
        router.navigate(['']);
        return false;
    }else{
        return true;
    }
}