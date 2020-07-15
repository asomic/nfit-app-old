//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//ionic 
import { ToastController, AlertController, ModalController } from '@ionic/angular';

//servicios
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.page.html',
  styleUrls: ['./profile-show.page.scss'],
})
export class ProfileShowPage implements OnInit {
  profile: any;
  profileSubscription: Subscription;
  alertSubscription: Subscription;
  

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  doRefresh(event) {
    this.profileSubscription.unsubscribe();
    this.ionViewWillEnter();
    setTimeout(() => {
        event.target.complete();
    }, 1000);
  }

  ionViewWillEnter(){
    this.profileSubscription = this.userService.profile().subscribe(response => {
      console.log(response);
      this.profile = response['data'];
      this.profileSubscription.unsubscribe();
    })

    this.alertSubscription = this.userService.getAlerts().subscribe(
      response => {
        console.log(response['data']);
        this.alertSubscription.unsubscribe();
      }
    );
  }

  async onLogout() {
    const alert = await this.alertCtrl.create({
        header: 'Cerrar Sesión',
        message: 'Desea salir de NFIT?',
        buttons: [
        {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
                console.log('Confirm Cancel: blah' + blah);
            }
        }, {
            text: 'Salir',
            handler: () => {
                this.authService.logout();
            }
        }
        ]
    });

    await alert.present();
}

edit(){
  this.router.navigateByUrl('home/tabs/profile/edit');
}
  
}
