import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';
//ionic
import { LoadingController, AlertController, ModalController } from '@ionic/angular';

//custom
import { AuthService } from '../../../services/auth/auth.service';
// import { BoxSelectPage } from '../box-select/box-select.page';

//capacitor
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  box: any ;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    // public modalController: ModalController
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
        // this.getBox();
        // console.log(this.box);
  }

  //verificar box
  // async getBox(){
  //   await Storage.get({ key: 'box' }).then( response => {
  //     console.log(response.value);
  //     if(response.value){
  //       this.box = JSON.parse(response.value) ;
  //     } else {
  //       this.box = null
  //       this.boxModal();
  //     }
  //   });
  // }

  //modal seleccion box
  // async boxModal() {
  //   const modal = await this.modalController.create({
  //     component: BoxSelectPage
  //   });
  //   modal.present();
  //   modal.onDidDismiss().then( responce => {
  //       this.ionViewWillEnter()
  //     }
  //   );
  // }

 //modal edit box
  // async editBox(){
  //   await Storage.remove({ key: 'box' }).then( response => {
  //     this.boxModal();
  //   });
  // }

  //send login form 
  onSubmit(form: NgForm){
    // if(!form.valid || this.box == null){
    //   return;
    // }

    this.loadingCtrl.create({keyboardClose: true,message: 'Validando credenciales...'}).then(
      loading => {
        loading.present();
        const email = form.value.email;
        const password = form.value.password;
        console.log(email);
        let domainSub = this.authService.getDomain(email).subscribe(response => {
          let authSubscription = this.authService.authenticate(email, password, response['domain'] ).subscribe(authModel => {
            if(authModel.token){
              loading.dismiss();
              this.router.navigateByUrl('home/tabs/dashboard');
            } else {
              console.log('error auth.token');
            }
            authSubscription.unsubscribe();
          },
            err => {
              console.log('error auth');
              console.log(err);
              loading.dismiss();
              authSubscription.unsubscribe();
              this.authAlert('Error autentificación', 'Credenciales incorrectas');
          })
        });
        // let authSubscription = this.authService.authenticate(email,password,this.box['subdomain'] ).subscribe(authModel => {
        //   if(authModel.token){
        //     loading.dismiss();
        //     this.router.navigateByUrl('home/tabs/dashboard');
        //   } else {
        //     console.log('error auth.token');
        //   }
        //   authSubscription.unsubscribe();
        // },
        //   err => {

        //     console.log('error general');
        //     console.log(err);

        //     loading.dismiss();
        //     authSubscription.unsubscribe();
        //     this.authAlert(err.error.error,err.error.message);
        // })
      }
    );
  }

  async authAlert(header:string, message:string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  
  


}
