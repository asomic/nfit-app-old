//angular
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
//ionic 
import { LoadingController } from '@ionic/angular';
//capacitor
import { Plugins } from '@capacitor/core';

//servicios
import { WodService } from '../../../services/wod/wod.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wod-show',
  templateUrl: './wod-show.page.html',
  styleUrls: ['./wod-show.page.scss'],
})
export class WodShowPage implements OnInit {

  wod:any;
  wodSubscription: Subscription;
  
  constructor(private http: HttpClient,
    private loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute,
    private wodService: WodService,

    ) { }

  ngOnInit() {

  }

  doRefresh(event) {
    this.wodSubscription.unsubscribe();
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
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        //obteniendo wod
        this.wodSubscription = this.wodService.getWod(id).subscribe( response => {
          this.wod = response['data'];
          loading.dismiss();
      })
      }
    );
  }

  getWod(){

  }

}
