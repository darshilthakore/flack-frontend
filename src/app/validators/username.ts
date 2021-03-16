import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Injectable()
export class UsernameValidator {

  debouncer: any;

  constructor(public loginService: LoginService){

  }

  checkUsername(control: FormControl): any {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {

        this.loginService.checkUsername(control.value).subscribe((res) => {
          if(res['available'] == true){
            resolve(null);
          }
          else {
          resolve({'usernameInUse': true});
          }
        });

      }, 1000);      

    });
  }

}