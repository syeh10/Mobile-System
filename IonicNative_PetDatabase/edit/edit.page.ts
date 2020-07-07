/**
 * Component of edit that inject PetService for checking data
 */
import { Component, OnInit } from '@angular/core';
import { PetService, Pet } from '../pet.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: 'edit.page.html',
  styleUrls: ['edit.page.scss']
})
export class EditPage implements OnInit{ 
  currentIndex: number = 1;
  totalRecords = this.petService.getTotalRecords();
  species = ["Dog", "Cat", "Fish", "Bird", "Snake", "Other"];
  dialogVar = false;
  dialogDeleteButton = true;
  sexs = ["Male", "Female"];
  data: Pet[];
  currentName: string;
  currentSpecies: string;
  currentAge: number;
  currentSex:string;
  currentPhone: string;
  message: string;
  
  /**
   * Initialise automatically pets from PetService for go previouse and next button
   * @param pets 
   */
  constructor(
    private petService: PetService, 
    private dialogs: Dialogs,
    private toastController: ToastController,
    public alertController: AlertController
    ) {
      this.petService.getTotalRecords();
      this.data = petService.getPets();
    if (this.data.length == 0) {
      this.message = "Already at the first of data.";
    } 
    else{
      this.currentIndex = 1;
      let thisPet = this.data[0];
      this.currentName = thisPet.name;
      this.currentSpecies = thisPet.species;
      this.currentAge = thisPet.age;
      this.currentSex = thisPet.sex;
      this.currentPhone = thisPet.phone;
    }
  }

  /**
   * Help information
   */
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Editing or deleting a pet by selecting specific data. Please use the PREVIOUS and NEXT button to select.',
      duration: 15000,
      showCloseButton: true,
      closeButtonText: "OK",
      position: 'bottom'
    });
    toast.present();
  }

  /**
  * Injecting pet data from PetService
  */
  ngOnInit(): void {
  }

  /**
   * Go to previouse data
   */
  async doPrev() {
    if (this.currentIndex <= 1) {
      // this.message = "Already at the first of data.";
      const toast = await this.toastController.create({
        message: 'Already at the first of data.',
        duration: 3000,
        showCloseButton: true,
        position: 'middle'
      });
      toast.present();
      
    } else {
      this.message = "";
      this.currentIndex--;
      let prevPet = this.data[this.currentIndex-1];
      this.currentName = prevPet.name;
      this.currentSpecies = prevPet.species;
      this.currentAge = prevPet.age;
      this.currentSex = prevPet.sex;
      this.currentPhone = prevPet.phone;
    }
  }

  /**
   * Go to next data
   */
  async doNext() {
    if (this.currentIndex == this.data.length) {
      // this.message = "Woops~ This is the last of data.";
      const toast = await this.toastController.create({
        message: 'Woops~ This is the last of data.',
        duration: 3000,
        showCloseButton: true,
        position: 'middle'
      });
      toast.present();
    } else {
      this.message = "";
      this.currentIndex++;
      let nextPet = this.data[this.currentIndex+1];
      this.currentName = nextPet.name;
      this.currentSpecies = nextPet.species;
      this.currentAge = nextPet.age;
      this.currentSex = nextPet.sex;
      this.currentPhone = nextPet.phone;
    }
  }

  /**
   * Editting data and storing to the pet array
   */
  async doEdit() {
    let thisData = this.data[this.currentIndex-1];
    if (this.currentIndex <= 0) {
      // this.message = "There is no pet can be updated";
      const toast = await this.toastController.create({
        message: "There is NO PET can be updated",
        duration: 5000,
        showCloseButton: true,
        position: 'middle'
      });
      toast.present();
    } 
    else if(thisData.name != this.currentName){
      // this.message = "Pet name can not be changed!!!";
      const toast = await this.toastController.create({
        message: "Pet NAME can not be changed.",
        duration: 5000,
        showCloseButton: true,
        position: 'middle'
      });
      toast.present();
    }
    else{
      thisData.name = this.currentName;
      thisData.species = this.currentSpecies;
      thisData.age = this.currentAge;
      thisData.sex = this.currentSex;
      thisData.phone = this.currentPhone;
      // this.message = thisData.name + " has been updated.";
      const toast = await this.toastController.create({
        message: thisData.name + " has been updated.",
        duration: 5000,
        showCloseButton: true,
        position: 'middle'
      });
      toast.present();
    }
  }

  /**
   * Show the dialog for confirm a data is going to delet
   */
  async showDialog() {
    const alert = await this.alertController.create({
      message: 'Do you really want to delete?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.doDeleteYes();
          }
        }, {
          text: 'No',
          handler: () => {
            this.doDeleteNo();
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * Confirm to delete
   */
  async doDeleteYes(){
    //delete the data by the current location in the array
    this.data.splice(this.currentIndex, 1);
    //current location is going to decrease if the index same as the length of pet array
    if (this.currentIndex == this.data.length) {
      this.currentIndex--;
      // this.totalRecords--;
    }
    //show message if there is no pet  
    if (this.data.length == 0) {
      this.message = "No pets in the list."
      this.currentName = "";
    } 
    else { //The pet is in the list
      this.currentName = this.data[this.currentIndex].name;
      // this.message = this.currentName + " confirmed delete.";
      const toast = await this.toastController.create({
        message: this.currentName + " confirmed delete.",
        duration: 5000,
        showCloseButton: true,
        position: 'middle'
      });
      toast.present();

      this.dialogVar = false;
      this.dialogDeleteButton = true;
      this.totalRecords--;
    }
  }

  /**
   * Cancel to delete
   */
  doDeleteNo(){
    this.dialogVar = false;
    this.dialogDeleteButton = true;
  }

  /**
   * Load details into corresponding input field 
   * when data is selected from select list
   * @param value 
   */
  petDetails(value: string): void {
  this.data.forEach(
    function(arrayPet) {
        if (value == arrayPet.name) {
          this.currentName.value = arrayPet.name;
          this.currentSpecies.value = arrayPet.species;
          this.currentAge.value = arrayPet.age;
          this.currentSex.value = arrayPet.sex;
          this.currentPhone.value = this.data[this.currentIndex].phone;
        }
      }
    );
  }

  /**
   * Changing data by selecting a pet name
   * @param event 
   */
  onChange(event: Event) {
    this.currentName = (<HTMLSelectElement>event.target).value;
  }
  
}