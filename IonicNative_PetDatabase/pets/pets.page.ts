import { Component } from '@angular/core';
import { PetService, Pet } from '../pet.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pets',
  templateUrl: 'pets.page.html',
  styleUrls: ['pets.page.scss']
})
export class PetsPage {
  pets: Pet[];
  constructor(petService: PetService, private toastController: ToastController) {
    this.pets = petService.getPets();
  }

  /**
   * Help information
   */
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'This page listing all pets from the data.',
      duration: 15000,
      showCloseButton: true,
      closeButtonText: "OK",
      position: 'bottom'

    });
    toast.present();
  }
}
