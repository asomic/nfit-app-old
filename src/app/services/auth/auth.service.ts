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
  authRefreshing: boolean = false;
  count: number = 0;

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
        return true
      } else {
        console.log(false);
        return false;
      }
    }));    
  }

  forgot(email , subdomain) {

    const data = JSON.stringify({
      email: email,
    });

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const domain : string = environment.http+subdomain+environment.domain;
    return  this.http.post(domain+'/password/reset', data, httpOptions).pipe(map(
      result => {
        console.log(result);
        return true;
      },
      error => {
        console.log(error);
        return false;
      }
    ));

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
          parsedData['_email'],
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
            const auth = this._auth.next(null);
            Plugins.Storage.remove({ key: "auth" }).then(result => {
              if (auth == null) {

                this.router.navigateByUrl('/login');
                loadingEl.dismiss();
              }
            });

        }
    );
  }

  authRefresh() {
    
    console.log('authRefreshing: '+this.authRefreshing);
    console.log('auth refresh_token');
    if(!this.authRefreshing){
      Plugins.Storage.get({ key: "auth" }).then(storasgeData =>{
        if (!storasgeData || !storasgeData.value) {
         this.router.navigateByUrl('/login');
        }
        const parsedData = JSON.parse(storasgeData.value);
        const data = JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: parsedData['_refreshToken'],
          client_id: 1,
          client_secret: environment.apikey,
        });

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        
        this.authRefreshing = true;
        this.http.post(parsedData['_domain']+'/oauth/token', data, httpOptions).subscribe(
          response => {
            const httpOptions = {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + response['access_token']
              })
            };
            this._auth.next(
              new Auth(
                parsedData['_email'],
                response['access_token'],
                response['refresh_token'],
                response['expires_in'],
                parsedData['_domain'],
                httpOptions
              )
            )
            // console.log(this._auth);
            this.storeUserData(this._auth.value);
            this.authRefreshing = false;
          },
          error => {
            console.log('error refresh')
            console.log(error);
            this.router.navigateByUrl('/login');
            this.authRefreshing = false;
          }
        );
      
      }
    )
    } else {
      console.log(' se esta refrescando');
    }
  }

  authRefresh2() {
    console.log('auth recall');
    return from(Plugins.Storage.get({ key: "auth" })).pipe(
      map(storasgeData => {
        if (!storasgeData || !storasgeData.value) {
          return null;
        }
        const parsedData = JSON.parse(storasgeData.value);
        const data = JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: parsedData['_refreshToken'],
          client_id: 1,
          client_secret: environment.apikey,
        });
        const response = this.http.post(parsedData['_refreshToken']+'/oauth/token', data, parsedData['_header']);
        return response.pipe(map( response => {
          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + response['access_token']
            })
          };
          
          this._auth.next(
            new Auth(
              parsedData['_email'],
              response['access_token'],
              response['refresh_token'],
              response['expires_in'],
              parsedData['_domain'],
              httpOptions
            )
          )
          // console.log(this._auth);
          this.storeUserData(this._auth.value);

          return this._auth.value;
          }))
      }),

    );
  }

  validateToken(auth: Auth){
    return false;
  }

  public get refreshToken() {
    return this._auth.value._refreshToken;
  }


}
