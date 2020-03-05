//angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//ionic
import { LoadingController } from '@ionic/angular';
//services
import { ClaseService } from '../../../services/clase/clase.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-select-day',
  templateUrl: './select-day.page.html',
  styleUrls: ['./select-day.page.scss'],
})
export class SelectDayPage  {
    public week: any = [];
    public weekSubscription: Subscription;

    constructor( 
                 private router: Router,
                 public activatedRoute: ActivatedRoute,
                 public loadingCtrl: LoadingController,
                 private claseService: ClaseService,
                ) { }


    ngOnInit() {
        
    }

    doRefresh(event) {
        this.weekSubscription.unsubscribe();
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
                const id = this.activatedRoute.snapshot.paramMap.get('claseTypeId');
                this.weekSubscription = this.claseService.getClaseTypeWeek(id).subscribe(
                    respose => {
                        console.log(respose);
                        this.week = respose['data'];
                        loading.dismiss();

                    },
                    error => {
                        alert('error 1001: error obteniendo los datos');
                        loading.dismiss();
                    }

                )
            }
        );
    }

    goToAddHour(date: string = '2015-01-01', has: boolean = false ) {
        console.log(has);

        if (has) {
            const claseTypeId = this.activatedRoute.snapshot.paramMap.get('claseTypeId');

            this.router.navigateByUrl(
                `/home/tabs/clases/clase-type/${claseTypeId}/select-day/${date}`
            );
        }
    }
            

}
