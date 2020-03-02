//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//servicios
import { ClaseService } from '../../../services/clase/clase.service';

@Component({
  selector: 'app-clase-history',
  templateUrl: './clase-history.page.html',
  styleUrls: ['./clase-history.page.scss'],
})
export class ClaseHistoryPage implements OnInit {

  pastClases: any; 

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

  ionViewWillEnter(){
    this.pastClases = [];
    this.claseService.getPastClases(1).subscribe( response => {
      this.pastClases = response['data'];
      console.log('historico');
      console.log(this.pastClases);
    })
  }

  goToClase(claseId: string) {
    this.router.navigate(['/home/tabs/clases/'+claseId+'']);
  }

}
