/**
 * Component of add that inject PetService for checking data
 */
import { Component, OnInit } from '@angular/core';
import { PetService, Pet } from '../pet.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
  styleUrls: ['add.page.scss']
})
export class AddPage implements OnInit{ 
  species = ["Dog", "Cat", "Fish", "Bird", "Snake", "Other"];
  specie = "Dog";//default value
  newAge = 0;
  sexs = ["Male", "Female"];
  sex = "Male"; //default value
  newPhone = "";

  /**
   * Initialise automatically
   * @param pets 
   */
  constructor(private petService: PetService, private toastController: ToastController) {
    this.data = petService.getPets();
   }

   async presentToast() {
    const toast = await this.toastController.create({
      message: 'Adding a new pet by enter information.',
      duration: 15000,
      showCloseButton: true,
      closeButtonText: "OK",
      position: 'bottom'

    });
    toast.present();
  }

  data: Pet[];

  /**
   * Get pets function
   */
  getPets(){
    this.data = this.petService.getPets();
  }

  /**
  * Injecting pet data from PetService
  */
  ngOnInit(): void {
    this.getPets;
  }
  message: string;
  newName: string;

  /**
   * Add pet function
   */
  async add(){
    this.message = "";
    typeof this.newName;
    if (this.petService.isExist(this.newName)) {
      // this.message = "There is another pet with the same pet name.";
      const toast = await this.toastController.create({
        message: 'There is another pet with the same pet name.',
        duration: 5000,
        showCloseButton: true,
        position: 'middle'
      });
      toast.present();
    }
    else {
      let p: Pet;
      p = { 
        name: this.newName, 
        species: this.specie,
        age: this.newAge,
        sex: this.sex,
        phone: this.newPhone
      };
      this.petService.doAdd(p);
      this.getPets();
      // this.message = this.newName + " has been saved."
      const toast = await this.toastController.create({
        message: this.newName +' has been saved.',
        duration: 5000,
        showCloseButton: true,
        position: 'middle'
      });
      toast.present();
    }
  }
}
