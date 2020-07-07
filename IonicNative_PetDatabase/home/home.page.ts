import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  myName: string = "Shu Wei, Yeh";
  constructor(private toastController: ToastController) {
  }
  
  /**
   * Help information
   */
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Home page which is only shows information of author.',
      duration: 15000,
      showCloseButton: true,
      closeButtonText: "OK",
      position: 'bottom'

    });
    toast.present();
  }
  // presentToast() {
  //   this.toastCtrl.create({
  //     message: 'User was added successfully',
  //     duration: 15000,
  //     showCloseButton: true,
  //     closeButtonText: "OK",
  //     position: 'middle'
  //   });
  // }
}
