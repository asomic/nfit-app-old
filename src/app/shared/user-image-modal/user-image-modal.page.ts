import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-image-modal',
  templateUrl: './user-image-modal.page.html',
  styleUrls: ['./user-image-modal.page.scss'],
})
export class UserImageModalPage implements OnInit {
  img;
  prod;
  constructor() { }

  ngOnInit() {
    console.log(this.img);
    console.log("url('"+ this.img +"')");
    this.prod = "url('"+ this.img +"')";
    console.log(this.prod);
  }

}
