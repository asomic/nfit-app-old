//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//servicios
import { ClaseService } from '../../../services/clase/clase.service';

@Component({
  selector: 'app-clase-index',
  templateUrl: './clase-index.page.html',
  styleUrls: ['./clase-index.page.scss'],
})
export class ClaseIndexPage implements OnInit {

  nextClases: any;
  constructor(
    private claseService: ClaseService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
        event.target.complete();
    }, 1000);
  }

  ionViewWillEnter() {
    this.claseService.getNextClases().subscribe( response => {
      this.nextClases = response['data'].filter(clase => clase.active);
      console.log(this.nextClases);
    })
  }

  // goToWod(wodId: any ) {
  //   this.router.navigate([`/home/tabs/dashboard/wods/${wodId}`]);
  // }

  goToClase(claseId: string) {
    this.router.navigate([`/home/tabs/clases/${claseId}`]);
  }

  goToHistory() {
    this.router.navigate(['/home/tabs/clases/history']);
  }

  goToSelectClaseType() {
    this.router.navigate( ['/home/tabs/clases/clase-type'] );
  }

}
