import { Component, OnInit } from '@angular/core';
//servicios
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.page.html',
  styleUrls: ['./profile-show.page.scss'],
})
export class ProfileShowPage implements OnInit {
  profile:any;

  constructor(
    private userservice: UserService,
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
    this.userservice.profile().subscribe(response => {
      console.log(response);
      this.profile = response['data'];
    })
  }

  
}
