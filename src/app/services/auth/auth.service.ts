//environment
import { environment } from '../../../environments/environment';
//angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//ionic
import { LoadingController } from '@ionic/angular';
//rxjs
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
//capacitor
import { Plugins } from '@capacitor/core';
//models
import { Auth } from '../../models/auth.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = new BehaviorSubject<Auth>(null);
  authState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  public get auth() {
    return this._auth.asObservable().pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
    );
  }

  //verificar si existe auth 
  get isAuthenticated() {
    console.log('isAuthenticated');

    return this._auth.asObservable().pipe(map(auth => {
      if (auth) {
        console.log(true);
        return true;
      } else {
        console.log(false);
        return false;
      }
    }));    
  }

  authenticate(email, password, subdomain) {

    const data = JSON.stringify({
        username: email,
        password: password,
        grant_type: 'password',
        client_id: 1,
        client_secret: environment.apikey,
    });

    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const domain : string = environment.http+subdomain+environment.domain;
    const response = this.http.post(domain+'/oauth/token', data, httpOptions);
    return response.pipe(map( response => {
                  console.log(response);
                  const httpOptions = {
                    headers: new HttpHeaders({
                      Authorization: 'Bearer ' + response['access_token']
                    })
                  };
                  this._auth.next(
                    new Auth(
                      email,
                      response['access_token'],
                      response['refresh_token'],
                      response['expires_in'],
                      domain,
                      httpOptions
                    )
                  )
                  // console.log(this._auth);
                  this.storeUserData(this._auth.value);
                  return this._auth.value;

    })) 
  }

  private storeUserData(auth: Auth) {
    Plugins.Storage.set({ key: "auth", value: JSON.stringify(auth) });
  }

  authRecall() {
    console.log('auth recall');
    return from(Plugins.Storage.get({ key: "auth" })).pipe(
      map(storasgeData => {
        if (!storasgeData || !storasgeData.value) {
          return null;
        }
        const parsedData = JSON.parse(storasgeData.value);
        // console.log("parsedata");
        // console.log(parsedData);
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + parsedData['_token']
          })
        };
        const auth = new Auth(
          parsedData['email'],
          parsedData['_token'],
          parsedData['_refreshToken'],
          parsedData['_tokenExpirationDate'],
          parsedData['_domain'],
          httpOptions,
        )

        return auth;
      }),
      tap(auth => {
        if (auth) {
          this._auth.next(auth);
        }
      }),
      map(auth => {
        return !!auth;
      })
    );
  }

  logout() {
    this.loadingCtrl.create({ keyboardClose: true, spinner: 'crescent'})
        .then(loadingEl => {
            loadingEl.present();
            console.log(this.auth);
            console.log(this._auth);
            const auth = this._auth.next(null);
            console.log(this.auth);
            console.log(this._auth);
            Plugins.Storage.remove({ key: "auth" }).then(result => {
              console.log('auth');
              console.log(result);
              if (auth == null) {
                console.log('redirigiendo');
                this.router.navigateByUrl('/login');
                loadingEl.dismiss();
              }
            });

        }
    );
}


}
