import { Component, OnInit } from '@angular/core';
//ionic 
import { ToastController, AlertController, ModalController } from '@ionic/angular';

//servicios
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.page.html',
  styleUrls: ['./profile-show.page.scss'],
})
export class ProfileShowPage implements OnInit {
  profile: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
        event.target.complete();
    }, 1000);
  }

  ionViewWillEnter(){
    this.userService.profile().subscribe(response => {
      console.log(response);
      this.profile = response['data'];
    })
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
  
}