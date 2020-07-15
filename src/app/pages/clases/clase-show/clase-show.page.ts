//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
//capacitor 
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

//ionic
import { ModalController, LoadingController} from '@ionic/angular';
//servicios
import { ClaseService } from '../../../services/clase/clase.service';
//modals
import { ClaseModalPage } from '../clase-modal/clase-modal.page';
import { UserImageModalPage } from '../../../shared/user-image-modal/user-image-modal.page';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-clase-show',
  templateUrl: './clase-show.page.html',
  styleUrls: ['./clase-show.page.scss'],
})
export class ClaseShowPage implements OnInit {
  clase: any;
  reservations: any;
  reservationPage: number;
  getClaseSubscription: Subscription;
  getClaseReservationsSubscription: Subscription;
  constructor(
    private claseService: ClaseService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    public loadingCtrl: LoadingController,
    
  ) { }

  ngOnInit() {
    
  }

  doRefresh(event) {
    this.getClaseSubscription.unsubscribe();
    this.getClaseReservationsSubscription.unsubscribe();
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
        this.reservationPage = 1;
        const id = this.activatedRoute.snapshot.paramMap.get('id');

        this.getClaseSubscription = this.claseService.getClase(id).subscribe( 
          response => {
              this.clase = response['data'];
              console.log(this.clase )
              loading.dismiss();
              this.getClaseSubscription.unsubscribe();
          },
          error => {
              alert('error 1001: error obteniendo los datos');
              loading.dismiss();
              this.getClaseSubscription.unsubscribe();
          }
        )

        this.getClaseReservationsSubscription = this.claseService.getClaseReservations(id, this.reservationPage).subscribe( response => {
          this.reservations = response['data'];
          console.log(this.reservations);
          this.getClaseReservationsSubscription.unsubscribe();
        })

      });
  }
  //modals 
  async reserveModal() {
    const modal = await this.modalController.create({
        component: ClaseModalPage,
        componentProps: {
            title: 'Reservar esta hora',
            message: this.clase.dateHuman + ' de ' + this.clase.start +
                     ' a ' + this.clase.end + 'hrs',
            buttonIcon: '/assets/icon/info-brand.svg',
            claseId: this.clase.id,
            buttonActionAdd: true,
        },
        cssClass: 'modal-confirm'
    });
    modal.onDidDismiss().then( data => {
      console.log(data);
      this.router.navigateByUrl('home/tabs/clases');
    });
    return await modal.present();
  }

  async openModalCeder() {
    const modal = await this.modalController.create({
        component: ClaseModalPage,
        componentProps: {
            custom_id: 0,
            title: 'Ceder tu Cupo',
            message: 'Si cedes tu cupo podrás reservar en otro horario',
            buttonIcon: '/assets/icon/info-brand.svg',
            claseId: this.clase.id,
            buttonActionRemove: true,
        },
        cssClass: 'modal-confirm'
    });
    modal.onDidDismiss().then( data => {
      console.log(data);
      this.router.navigateByUrl('home/tabs/clases');
    });
    return await modal.present();
  }

  async confirmModal() {
    const modal = await this.modalController.create({
        component: ClaseModalPage,
        componentProps: {
            custom_id: 1,
            title: 'Confirmar esta clase',
            message: `${this.clase.dateHuman} de ${this.clase.start} a ${this.clase.end}hrs. No podras cancelar esta accion`,
            buttonIcon: '/assets/icon/info-brand.svg',
            claseId: this.clase.id,
            buttonActionConfirm: true,
        },
        cssClass: 'modal-confirm'
    });
    modal.onDidDismiss().then( data => {
      console.log(data.data);
      if(data.data){
        this.router.navigateByUrl('home/tabs/clases');
      }
    });
    return await modal.present();
  }

  async imageClick(avatar) {
    const imgurl = avatar;
    const modal = await this.modalController.create({
        component: UserImageModalPage,
        componentProps: {
            title: 'imagen',
            img: imgurl,
        },
        cssClass: 'modal-confirm'
      });
    modal.onDidDismiss().then( data => {
      console.log('cerre image modal');
      console.log(data);
    });
    return await modal.present();
  }

  async goZoom() {
    if (this.clase) {
      await Browser.open({ url: this.clase.zoom_link});
    }
  }
}
