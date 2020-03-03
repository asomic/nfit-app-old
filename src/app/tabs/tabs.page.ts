import { Component, OnInit } from '@angular/core';
//ionic
import { Platform, ToastController  } from '@ionic/angular';

//capacitor
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;

//services
import { UserService } from '../services/user/user.service';

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

  ) { }

  ngOnInit() {
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', 
      (token: PushNotificationToken) => {
       // alert('Push registration success, token: ' + token.value);
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
        console.log(notification);
        this.pushToast(notification.title,notification.body);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: PushNotificationActionPerformed) => {
        console.log(notification);
        
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

}
