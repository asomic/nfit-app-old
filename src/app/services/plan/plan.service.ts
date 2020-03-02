import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

//services
import { AuthService } from '../../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private authservice: AuthService,
    private http: HttpClient,
  ) { }


  getPlans(){
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.get(
            auth._domain+'/plans?all=true',
            auth._header
          )
        }
      )
    );
  }

  getPlan(id:any){
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.get(
            auth._domain+'/plans/' +id,
            auth._header
          )
        }
      )
    );
  }
  
  actualPlan(){
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.get(
            auth._domain+'/profile/actualplan',
            auth._header
          )
        }
      )
    );
  }

}
