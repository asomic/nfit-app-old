import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

//services
import { AuthService } from '../../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(
    private authservice: AuthService,
    private http: HttpClient,

  ) { }

  //obeteniendo clase por id 
  getClase(id){
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.get(
            auth._domain+'/clases/'+id,
            auth._header
          )
        }
      )
    );
  }

  //todas las reservas de la clase
  getClaseReservations(id, page){
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.get(
            auth._domain+'/clases/'+id+'/reservations',
            auth._header
          )
        }
      )
    );
  }

  //todas las clases proximas 
  getNextClases() {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.get(
            auth._domain+'/clases/coming?sort_by_asc=date',
            auth._header
          )
        }
      )
    );
  }

    //todas las clases proximas 
    getPastClases(page:number) {
      return this.authservice.auth.pipe(
        switchMap(
          auth => {
            return this.http.get(
              auth._domain+'/clases/historic',
              auth._header
            )
          }
        )
      );
    }

  //reservar clase
  claseReserve(id) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.post(
            auth._domain+'/clases/'+id+'/reserve',
            null,
            auth._header
          )
        }
      )
    );
  }

  //confirmar clase
  claseConfirm(id) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.post(
            auth._domain+'/clases/'+id+'/confirm',
            null,
            auth._header
          )
        }
      )
    );
  }

  //ceder clase
  claseRemove(id) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.post(
            auth._domain+'/clases/'+id+'/remove',
            null,
            auth._header
          )
        }
      )
    );
  }

    //zoom clase
    claseZoom( id ) {
      return this.authservice.auth.pipe(
        switchMap(
          auth => {
            return this.http.get(
              auth._domain + '/clases/' + id + '/zoom',
              auth._header
            )
          }
        )
      );
    }

  //tipos de clases
  getClaseTypes() {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.get(
            auth._domain+'/clases/types',
            auth._header
          )
        }
      )
    );
  }

  //tipos de clases
  getClaseTypeWeek(type) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.get(
            auth._domain+'/week/'+type,
            auth._header
          )
        }
      )
    );
  }
  //clase type hours
  getClaseTypeHour(type, date) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          return this.http.get(
            auth._domain+'/clases?date='+date+'&type='+type,
            auth._header
          )
        }
      )
    );
  }
}
