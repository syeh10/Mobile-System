import { Component, ViewChild} from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-sounds',
  templateUrl: 'sounds.page.html',
  styleUrls: ['sounds.page.scss']
})
export class SoundsPage {
  isOn: boolean = false;
  message: string;
  items: number[] = [1,2,3];
  sliderConfig = {//slider configuration
    spaceBetween:10,
    centeredSlides:true,
    slidesPerView:1.5,
    loop: true
  }

  constructor(private flashlight: Flashlight){
  }

  /**
   * Return a boolean based on whether the flashlight is available for use
   */
   isAvailable(){
    try {
      return this.flashlight.available();
    }
    catch (e) {
      this.message = e;
    }
  }

  /**
   * Toggles the flashlight between an on and off state. 
   * A variable is used to determine whether the flashlight is available.
   *  If it is available:
   *   Toggle the flashlight
   *   Toggle the 'isOn' variable that updates our view color/icon.
   *  If it isn't available:
   *   Log out to the console.
   */
   toggleFlash(){
    try {
      let available = this.isAvailable();
      if (available) {
        this.flashlight.toggle();
        this.isOn = !this.isOn;
      }
      else {
        this.message = "Not available.";
      }
    }
    catch (e) {
      this.message = e;
    }
  }
  
  @ViewChild('audio') audio;
  /**
   * Get audio from DOM and play audios
   */
  doPlay() {
    this.audio.nativeElement.play();
  }
}
