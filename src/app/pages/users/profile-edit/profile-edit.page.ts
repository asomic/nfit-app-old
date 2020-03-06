import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//capacitor 
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

//service
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  profileSubscription: Subscription;
  profile: any;

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.profileSubscription =this.userService.profile().subscribe(response => {
      console.log(response);
      this.profile = response['data'];
      this.profileSubscription.unsubscribe();
    })
  }

  async takePicture() {
    

    const image = await Plugins.Camera.getPhoto({
      quality: 60,
      width:720,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt
    });
   // input.append('avatar',image.base64String,'avatar');
    let input = new FormData();
    input.append("avatar", image.base64String);
    console.log('photo!!');

    let changeAvatarSubscription = this.userService.changeAvatar(input).subscribe(response => {
      console.log(response);
      changeAvatarSubscription.unsubscribe();
    })
    // this.storage.get('auth-token').then((value) => {

    //   let Bearer = value;
    //   this.httpOptions = {
    //     headers: new HttpHeaders({
    //       'Authorization': 'Bearer '+ Bearer//updated
    //     })};

    //     this.http.post(SERVER_URL+"api/profile/avatar",input, this.httpOptions)
    //     .subscribe((result: any) => {
    //       console.log('avataaaar!');
    //       console.log(result);
    //       this.presentToast('datos actualizados con éxito');
    //       this.ionViewDidEnter();
    //     });


    // });
  }

}
