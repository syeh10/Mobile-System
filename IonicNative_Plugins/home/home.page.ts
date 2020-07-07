import { Component } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  myName: string = "Shu Wei, Yeh";
  currentName: string = "Syeh10";
  version: string = "ionic@4";
  manufacturer: string = "Emulator";
  realDevice: boolean = false;
  serialNo: string;
  constructor(private device: Device){
    if(this.device.isVirtual){
      this.version = this.device.version;
      this.manufacturer = this.device.manufacturer;
      this.realDevice = this.device.isVirtual;
    }
      this.serialNo = this.device.serial;
  }
}
