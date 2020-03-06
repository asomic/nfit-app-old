//angular
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//ionic
import { LoadingController } from '@ionic/angular';
//servicios
import { ClaseService } from '../../../services/clase/clase.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-select-clase-type',
  templateUrl: './select-clase-type.page.html',
  styleUrls: ['./select-clase-type.page.scss'],
})
export class SelectClaseTypePage implements OnInit  {
    claseTypes: any;
    claseTypesSubscription: Subscription;
    constructor(
                 private router: Router,
                 public loadingCtrl: LoadingController,
                 private claseService: ClaseService,
                ) { }

    ngOnInit() {

    }

    doRefresh(event) {
        this.claseTypesSubscription.unsubscribe();
        this.ionViewWillEnter();
        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }

    ionViewWillEnter() {
        let loading = this.loadingCtrl.create({
            spinner: 'crescent'
        }).then( loading => {
                loading.present();
                this.claseTypesSubscription  = this.claseService.getClaseTypes().subscribe(
                    respose => {
                        this.claseTypes = respose['data'];
                        loading.dismiss();
                        this.claseTypesSubscription.unsubscribe();
                    },
                    error => {
                        alert('error 1001: error obteniendo los datos');
                        loading.dismiss();
                        this.claseTypesSubscription.unsubscribe();
                    }

                )
            }
        );
    }



    /**
     * [goToDay description]
     */
    goToDay(claseTypeId: number) {
        this.router.navigateByUrl(
            `/home/tabs/clases/clase-type/${claseTypeId}/select-day`
        );
    }
}
