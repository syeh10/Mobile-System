import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Shake } from '@ionic-native/shake/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-acceleration',
  templateUrl: 'acceleration.page.html',
  styleUrls: ['acceleration.page.scss']
})
export class AccelerationPage {

  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;
  shakeVibration: string;

  constructor(
    private deviceMotion: DeviceMotion, 
    private shake: Shake, 
    private vibration: Vibration
    ){
    // The accelerometer is a motion sensor that detects the change (delta) 
    // in movement relative to the current device orientation, 
    // in three dimensions along the x, y, and z axis.
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => 
      (
        this.accelerationX = acceleration.x,
        this.accelerationY = acceleration.y,
        this.accelerationZ = acceleration.z
        ),
      (error: any) => 
      (
        this.accelerationX = 'No x-axis',
        this.accelerationY = 'No y-axis',
        this.accelerationZ = 'No z-axis'
      )
    );
    
    
    // Vibrate with a shake sensitivity of 40
    this.shake.startWatch(40).subscribe(() => {
      this.shakeVibration = "Vibrating because of shaking!!!";
      // Vibrate the device for a second
      this.vibration.vibrate(1000);
    });


  }
}
