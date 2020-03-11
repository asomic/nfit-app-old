//angular
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//ionic
import { ModalController, LoadingController, AlertController} from '@ionic/angular';

//capacitor
import { Plugins } from '@capacitor/core';
//services 
import { AuthService } from '../../../services/auth/auth.service'
const { Storage } = Plugins;

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.page.html',
    styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage {
    registerCredentials = { email: '' };
    title;
    message;
    buttonIcon;
    disabled = false;

    constructor(
                private modalController: ModalController,
                private router: Router,
                private http: HttpClient,
                private authService: AuthService,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,


            ) { }

    async authAlert(message:string) {
        const alert = await this.alertCtrl.create({
            message: message,
            buttons: ['OK']
        });
    
        await alert.present();
    }

    sendForgot() {
        this.disabled = true;

        this.loadingCtrl.create({keyboardClose: true,message: 'Enviando correo para restablecer contraseña'}).then(
            loading => {
                loading.present();
                Storage.get({ key: 'box' }).then( response => {
                    if(response) {
                        let authSubscription = this.authService.forgot(this.registerCredentials.email, response).subscribe(
                            result => {
                                if(result){
                                    this.authAlert('Correo enviado a '+this.registerCredentials.email)
                                } else {
                                    this.authAlert('error enviado a '+this.registerCredentials.email)
                                } 
                                loading.dismiss();
                            }, 
                            error => {
                                loading.dismiss();
                            }
                        )
                    } else {
                        this.authAlert('Debes seleccionar un box')
                        console.log('sin box');
                        this.router.navigateByUrl('/login');
                        loading.dismiss();
                    }
                  });
            }
        );
        //this.authService



        // return new Promise((resolve, reject) => {
        // this.http.post(`${environment.SERVER_URL}/password/reset`, data, httpOptions)
        //     .subscribe((result: any) => {
        //         console.log('success reset');

        //         console.log(result);

        //         // this.openModalForgot(
        //         //     'Revisa tu Correo',
        //         //     'Te hemos enviado las instrucciones para reestablecer tu contraseña',
        //         //     '/assets/icon/check.svg'
        //         // );

        //         this.router.navigateByUrl('/auth');
        //     },
        //     (err) => {
        //         console.log('error reset');

        //         console.log(err);

        //         // this.showAlert(err.error[0].error, err.error[0].message);
        //         Plugins.Modals.alert({
        //             title: err.error.error,
        //             message: err.error.messag,
        //             buttonTitle: 'Entendido'
        //         });
        //         // this.openModalForgot(err.error.error, err.error.message);
        //     }
        // );
    }

    // backToLogin() {
    //     this.router.navigateByUrl('/auth/login');
    // }
}
