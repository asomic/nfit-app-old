//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';



// import { Label } from 'ng2-charts';
// import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
//capacitor
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;

//services
import { UserService } from '../../services/user/user.service';
//servicios
import { WodService } from '../../services/wod/wod.service';
import { ClaseService } from '../../services/clase/clase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  todayWods: any
  nextClase: any = [];
  token: any;
  constructor(
    private wodService: WodService,
    private claseService: ClaseService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', 
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
        this.token = token.value;
        this.userService.addPushToken(token.value).subscribe(result => {
          console.log(result);
          
        });
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', 
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', 
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  doRefresh(event) {
    console.log('refresh');
    this.ionViewWillEnter();
    setTimeout(() => {
        event.target.complete();
    }, 1000);
  }


  ionViewWillEnter() {
    this.wodService.getTodayWods().subscribe( response => {
      this.todayWods = response['data'];
    })

    this.claseService.getNextClases().subscribe( response => {
      this.nextClase = response['data'].filter(clase => clase.active)[0];
      console.log(this.nextClase);
    })
  }

  goToWod(wodId: any ) {
    this.router.navigate([`/home/tabs/dashboard/wods/${wodId}`]);
  }

  goToClase(claseId: string) {
    this.router.navigate([`/home/tabs/clases/${claseId}`]);
  }
}
