/**
 * Component of add that inject UnitService for checking data
 */
import { Component, OnInit } from '@angular/core';
import { UnitService, Unit } from './unit.service';
@Component({
  templateUrl: './add.component.html',
  styleUrls: [`./app.component.css`]
})
export class AddComponent implements OnInit{ 
  sessions = ["Session 1", "Session 2", "Session 3"];
  session = "Session 1";//default value
  newEnrolments = "0";

  newLevel:string = "Introductory";
  levels = [{display:"Introductory", value:"Introductory" },
            {display:"Intermediate", value:"Intermediate" },
            {display:"Advanced", value:"Advanced" }
          ];
  /**
   * Initialise automatically
   * @param units 
   */
  constructor(private unitService: UnitService) {
    this.data = unitService.getUnits();
   }

  data: Unit[];

  /**
   * Get units function
   */
  getUnits(){
    this.data = this.unitService.getUnits();
  }

  /**
  * Injecting unit data from UnitService
  */
  ngOnInit(): void {
    this.getUnits;
  }
  message: string;
  newCode: string;
  newName: string;

  /**
   * Add unit function
   */
  add(){
    this.message = "";
    typeof this.newCode;
    typeof this.newName;
    if(typeof this.newCode == "undefined"){
      this.message = "Unit code is required.";
    }
    else if(typeof this.newName == "undefined"){
      this.message = "Unit name is required.";
    }
    else if (this.unitService.isExist(this.newCode)) {
      this.message = "There is another unit with the same unit code.";
    }
    else {
      let u: Unit;
      u = { 
        code: this.newCode, 
        name: this.newName, 
        session: this.session,
        level: this.newLevel,
        enrolments: this.newEnrolments
      };
      this.unitService.doAdd(u);
      this.getUnits();
      this.message = this.newCode + " has been saved."
    }
  }
}