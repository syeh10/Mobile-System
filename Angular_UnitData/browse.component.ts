/**
 * Component of browse
 */
import { Component, OnInit } from '@angular/core';
import { UnitService, Unit } from './unit.service';
@Component({
    templateUrl: `./browse.component.html`,
    styleUrls: [`./app.component.css`]
})
export class BrowseComponent implements OnInit{ 
  currentIndex: number = 1;
  totalRecords = this.unitService.getTotalRecords();
  sessions = ["Session 1", "Session 2", "Session 3"];
  dialogVar = false;
  dialogDeleteButton = true;
  levels = [ {display:"Introductory", value:"Introductory" },
            {display:"Intermediate", value:"Intermediate" },
            {display:"Advanced", value:"Advanced" }
            ];
  data: Unit[];
  currentCode: string;
  currentName: string;
  currentSession: string;
  currentLevel:string;
  currentEnrolments: string;
  message: string;
  
  /**
   * Initialise automatically units from UnitService for go previouse and next button
   * @param units 
   */
  constructor(private unitService: UnitService) {
    this.data = unitService.getUnits();
    if (this.data.length == 0) {
      this.message = "Already at the first of data.";
    } 
    else{
      this.currentIndex = 1;
      let thisUnit = this.data[0];
      this.currentCode = thisUnit.code;
      this.currentName = thisUnit.name;
      this.currentSession = thisUnit.session;
      this.currentLevel = thisUnit.level;
      this.currentEnrolments = thisUnit.enrolments;
    }
  }

  /**
  * Injecting unit data from UnitService
  */
  ngOnInit(): void {
  }

  /**
   * Go to previouse data
   */
  doPrev() {
    if (this.currentIndex <= 1) {
      this.message = "Already at the first of data.";
    } else {
      this.message = "";
      this.currentIndex--;
      let prevUnit = this.data[this.currentIndex-1];
      this.currentCode = prevUnit.code;
      this.currentName = prevUnit.name;
      this.currentSession = prevUnit.session;
      this.currentLevel = prevUnit.level;
      this.currentEnrolments = prevUnit.enrolments;
    }
  }

  /**
   * Go to next data
   */
  doNext() {
    if (this.currentIndex == this.data.length) {
      this.message = "Woops~ This is the last of data.";
    } else {
      this.message = "";
      this.currentIndex++;
      let nextUnit = this.data[this.currentIndex-1];
      this.currentCode = nextUnit.code;
      this.currentName = nextUnit.name;
      this.currentSession = nextUnit.session;
      this.currentLevel = nextUnit.level;
      this.currentEnrolments = nextUnit.enrolments;
    }
  }

  /**
   * Editting data and storing to the unit array
   */
  doEdit() {
    if (this.currentIndex <= 0) {
      this.message = "There is no unit to update";
    } 
    else if(this.data[this.currentIndex-1].code != this.currentCode){
      this.message = "Unit code can not be changed!!!";
    }
    else{
      this.data[this.currentIndex-1].code = this.currentCode;
      this.data[this.currentIndex-1].name = this.currentName;
      this.data[this.currentIndex-1].session = this.currentSession;
      this.data[this.currentIndex-1].level = this.currentLevel;
      this.data[this.currentIndex-1].enrolments = this.currentEnrolments;
      this.message = this.data[this.currentIndex-1].code + " has been updated.";
    }
  }

  /**
   * Show the dialog for confirm a data is going to delet
   */
  showDialog() {
    this.dialogVar = true;
    this.dialogDeleteButton = false;
  }

  /**
   * Confirm to delete
   */
  doDeleteYes(){
    //delete the data by the current location in the array
    this.data.splice(this.currentIndex, 1);
    //current location is going to decrease if the index same as the length of unit array
    if (this.currentIndex == this.data.length) {
      this.currentIndex--;
      // this.totalRecords--;
    }
    //show message if there is no unit  
    if (this.data.length == 0) {
      this.message = "No units in the list."
      this.currentCode = "";
      this.currentName = "";
    } 
    else { //The unit is in the list
      this.currentCode = this.data[this.currentIndex].code;
      this.currentName = this.data[this.currentIndex].name;
      this.message = this.currentCode + " confirmed delete.";
      this.dialogVar = false;
      this.dialogDeleteButton = true;
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
  unitDetails(value: string): void {
  this.data.forEach(
    function(arrayUnit) {
        if (value == arrayUnit.code) {
          this.currentCode.value = arrayUnit.code;
          this.currentName.value = arrayUnit.name;
          this.currentSession.value = arrayUnit.session;
          this.currentLevel.value = arrayUnit.level;
          this.currentEnrolments.value = this.data[this.currentIndex].enrolments;
        }
      }
    );
  }

  /**
   * Changing data by selecting a unit code
   * @param event 
   */
  onChange(event: Event) {
    this.currentCode = (<HTMLSelectElement>event.target).value;
  }
}