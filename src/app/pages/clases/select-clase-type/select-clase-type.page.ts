//angular
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//ionic
import { LoadingController } from '@ionic/angular';
//servicios
import { ClaseService } from '../../../services/clase/clase.service';


@Component({
  selector: 'app-select-clase-type',
  templateUrl: './select-clase-type.page.html',
  styleUrls: ['./select-clase-type.page.scss'],
})
export class SelectClaseTypePage implements OnInit  {
    claseTypes: any;

    constructor(
                 private router: Router,
                 public loadingCtrl: LoadingController,
                 private claseService: ClaseService,
                ) { }

    ngOnInit() {

    }

    ionViewWillEnter() {
        let loading = this.loadingCtrl.create({
            spinner: 'crescent'
        }).then( loading => {
                loading.present();
                this.claseService.getClaseTypes().subscribe(
                    respose => {
                        this.claseTypes = respose['data'];
                        loading.dismiss();

                    },
                    error => {
                        loading.dismiss();
                        
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
