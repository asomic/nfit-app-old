import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

//services
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authservice: AuthService,
    private http: HttpClient,
  ) { }

  profile(){
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.get(
            auth._domain+'/profile',
            auth._header
          )
        }
      )
    );
  }

  addPushToken(token:any){
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.post(
            auth._domain+'/fcm/token/',
            { fcmtoken: token },
            auth._header
          )
        }
      )
    );
  }

  changeAvatar(input: FormData){
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.post(
            auth._domain+'/profile/image',
            input,
            auth._header
          )
        }
      )
    );
  }
}
