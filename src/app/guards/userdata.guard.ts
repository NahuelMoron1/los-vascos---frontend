import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const userdataGuard = () => {
    const router = inject(Router);
    if(localStorage.getItem("userCreated")){
        return true;
    }else{
        router.navigate(['/']);
        return false;
    }
}