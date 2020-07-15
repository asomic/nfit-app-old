//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap , take} from 'rxjs/operators';



// import { Label } from 'ng2-charts';
// import { ChartDataSets, ChartOptions, Chart } from 'chart.js';

//servicios
import { WodService } from '../../services/wod/wod.service';
import { ClaseService } from '../../services/clase/clase.service';
//services
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  todayWods: any;
  alerts: any;
  nextClase: any = [];
  wodSubscription: Subscription;
  nextClaseSubscription: Subscription;
  alertSubscription: Subscription;

  constructor(
    private wodService: WodService,
    private userService: UserService,
    private claseService: ClaseService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
 
  }

  doRefresh(event) {
    this.wodSubscription.unsubscribe();
    this.nextClaseSubscription.unsubscribe();
    console.log('refresh');
    this.ionViewWillEnter();
    setTimeout(() => {
        event.target.complete();
    }, 1000);
  }


  ionViewWillEnter() {

    this.alertSubscription = this.userService.getAlerts().subscribe(
      response => {
        this.alerts = response['data'];
        console.log(response['data']);
        this.alertSubscription.unsubscribe();
      }
    );

    this.wodSubscription = this.wodService.getTodayWods().subscribe(
      response => {
        this.todayWods = response['data'];
        this.wodSubscription.unsubscribe();
      }
    );

    this.nextClaseSubscription = this.claseService.getNextClases().subscribe( 
      response => {
        this.nextClase = response['data'].filter(clase => clase.active)[0];
        this.nextClaseSubscription.unsubscribe();
      }
    );

  }

  goToWod(wodId: any ) {
    this.router.navigate([`/home/tabs/dashboard/wods/${wodId}`]);
  }

  goToClase(claseId: any) {
    console.log(claseId);
    this.router.navigate([`/home/tabs/clases/${claseId}`]);
  }

  refreshTest() {
    console.log('clicked')
    this.authService.authRefresh()
   // this.authService.authRefresh2()
  }


}
