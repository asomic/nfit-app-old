import { Component, OnInit } from '@angular/core';
//ionic
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    public platform: Platform,
  ) { }

  ngOnInit() {

  }

}
