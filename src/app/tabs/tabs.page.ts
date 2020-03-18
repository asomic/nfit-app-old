import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
//ionic
import { Platform, ToastController, AlertController  } from '@ionic/angular';

import { FCM } from 'capacitor-fcm';
//capacitor
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;
const fcm = new FCM();

//services
import { UserService } from '../services/user/user.service';
// import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  token: any;
  constructor(
    public platform: Platform,
    private userService: UserService,
    public toastController: ToastController,
    private location: Location,
    private alertCtrl: AlertController,
    // private authService: AuthService,
  ) { }

  ngOnInit() {
    this.backButtonEvent();
    

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', 
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);

    });

    PushNotifications.register().then(()=> {
      fcm.getToken().then(
        result => {
          let addPushToken = this.userService.addPushToken(result.token).subscribe(result => {
           // this.pushToast(notification.title,notification.body);
            console.log(result);
            addPushToken.unsubscribe();
          });
        }
      );
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', 
      (error: any) => {
        alert('Error 0002: Error permisos mensajes push.');
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', 
      (notification: PushNotification) => {
        console.log(notification);
        this.pushToast(notification.title,notification.body);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: PushNotificationActionPerformed) => {
        const data: any = notification.notification.data;
        console.log('data');
        console.log(data);
        console.log('data title');
        console.log(data.title);
        console.log('data body');
        console.log(data.body);

        this.pushToast(data.title, data.body);
        
      }
    );
  }

  async pushToast(title:any,message:any) {
    const toast = await this.toastController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
           
          }
        }
      ]
    });
    toast.present();
  }

  backButtonEvent(): void {
    const sub = this.platform.backButton.subscribeWithPriority(9999, () => {
      if(this.location.isCurrentPathEqualTo('/home/tabs/dashboard') || this.location.isCurrentPathEqualTo(''))
      {
        navigator['app'].exitApp();
      } else {
        this.location.back();
      }
    });
  }

}
