import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//capacitor 
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

//service
import { UserService } from '../../../services/user/user.service';


/**
 * Convert image string into image file
 *
 * @return  Blob
 */
function base64toBlob(base64Data: any, contentType: string) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);

      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
  }

  return new Blob(byteArrays, { type: contentType });
}

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
  }

  onPickImage(imageData: File | string) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    console.log('entre a onPickImage...');
    console.log(imageFile);
    const avatar = new FormData();
    avatar.append('image', imageFile);
    console.log(avatar);

    let changeAvatarSubscription = this.userService.changeAvatar(avatar).subscribe(response => {
      console.log(response);
      changeAvatarSubscription.unsubscribe();
    })

    // Plugins.Storage.get({ key: 'authData' }).then((authData) => {
    //     const parsedData = JSON.parse(authData.value) as {
    //         token: string
    //     };
    //     const httpOptions = {
    //         headers: new HttpHeaders({ Authorization: `Bearer ${parsedData.token}` })
    //     };

    //     const avatar = new FormData();

    //     avatar.append('avatar', imageFile);

    //     console.log(avatar);

    //     this.http.post(
    //         `${ environment.IMAGE_URL }/api/users/${ this.loadedProfile.id }/image`,
    //         avatar,
    //         httpOptions
    //     ).subscribe((result: any) => {
    //             this.presentToast('datos actualizados con éxito');

    //             this.ionViewWillEnter();
    //         },
    //         err => {
    //             console.log(err);
    //             console.log('aqui estoy');

    //             this.viewCtrl.dismiss();
    //             this.presentToast('No se ha podido actualizar la imagen de perfil');
    //         }
    //     );
    // });
  }

}
