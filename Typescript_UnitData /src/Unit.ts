/*
Assignment Part 1
Name:Shu-Wei, Yeh
Student ID: 22862541
Campus: SCU Melbourne
*/

// A interface to describe the shape of unit.
interface Unit {
  code: string;//can not be changed
  name: string;
  session?: string;//optional property
  level?: string;//optional property
  enrolments?: string//optional property
};

//Declare an array of Unit
let data: Unit[] = [
  { code: "CSC73010", name: "Programming Mobile Systems" },
  { code: "CMP73001", name: "Cybersecurity Management", session: "session1", level: "introductory", enrolments: "200" }
];

//Showing the message
function message(msg: string) {
  document.getElementById("message").innerHTML = msg;
}

//Initializing index as an number that is -1
let index: number = -1;
//Showing the current index and total records
function updateDisplay() {
  document.getElementById("currentIndex").innerHTML = "" + (index + 1);
  document.getElementById("totalRecords").innerHTML = "" + data.length;
}

//Add data
function doAdd(): void {
  let uCode: string = (<HTMLInputElement>document.getElementById("code")).value;
  let uName: string = (<HTMLInputElement>document.getElementById("name")).value;
  let uSession: string = (<HTMLInputElement>document.getElementById("session")).value;
  let uLevel: string = (<HTMLInputElement>document.getElementById("level")).value;
  let uEnrolments: string = (<HTMLInputElement>document.getElementById("enrolments")).value;
  if (checkData()) {
    index = data.length;//add a data at the end of array
    data[index] = { code: uCode, name: uName, session: uSession, level: uLevel, enrolments: uEnrolments };
    loadData();
    updateDisplay();
    document.getElementById('message').innerHTML = uCode + " has been saved.";
  }
  updateDisplay();
}

//Edit data
function doEdit(): void {
  let uCode: string = (<HTMLInputElement>document.getElementById("code")).value;
  let uName: string = (<HTMLInputElement>document.getElementById("name")).value;
  let uSession: string = (<HTMLInputElement>document.getElementById("session")).value;
  let uLevel: string = (<HTMLInputElement>document.getElementById("level")).value;
  let uEnrolments: string = (<HTMLInputElement>document.getElementById("enrolments")).value;
  let thisData = {
    code: uCode,
    name: uName,
    session: uSession,
    level: uLevel,
    enrolments: uEnrolments
  };
  if (checkData()) {
    this.data[index] = thisData;
    clearInput();
    loadData();
    index = null;
    document.getElementById('message').innerHTML = uCode + " has been updated.";
  }
  updateDisplay();
}

//Load data
function loadData(): void {
  clearList();//clear list
  data.forEach(function(arrayUnit) {//for each object in database/array, load its code in select list
    var writer = arrayUnit.code;
    var listData = document.getElementById("searchList").innerHTML;
    document.getElementById("searchList").innerHTML = listData + "<option>" + writer + "</option>";
  });
}

//clearing the list excluding the default value
function clearList(): void {
  let selectList = (<HTMLSelectElement>document.getElementById("searchList"));
  selectList.length = 1;
}

//next data
function doNext(): void {
  message("");
  if (index == (data.length - 1)) {
    message("Woops~ this is the last of data.");
    return;
  }
  index++;
  (<HTMLInputElement>document.getElementById("code")).value = data[index].code;
  (<HTMLInputElement>document.getElementById("name")).value = data[index].name;
  (<HTMLInputElement>document.getElementById("session")).value = data[index].session;
  (<HTMLInputElement>document.getElementById("level")).value = data[index].level;
  (<HTMLInputElement>document.getElementById("enrolments")).value = data[index].enrolments;
  updateDisplay();
}

//Previous data
function doPrev(): void {
  message("");
  if (index <= 0) {  // at start or array is empty
    message("Already at the first of data.");
    return;
  }
  index--;
  (<HTMLInputElement>document.getElementById("code")).value = data[index].code;
  (<HTMLInputElement>document.getElementById("name")).value = data[index].name;
  (<HTMLInputElement>document.getElementById("session")).value = data[index].session;
  (<HTMLInputElement>document.getElementById("level")).value = data[index].level;
  (<HTMLInputElement>document.getElementById("enrolments")).value = data[index].enrolments;
  updateDisplay();
}

//function that will load details into corresponding input field when data is selected from select list
function unitDetails(value: string): void {
  data.forEach(
    function(arrayUnit) {
      if (value == arrayUnit.code) {
        (<HTMLInputElement>document.getElementById("code")).value = arrayUnit.code;
        (<HTMLInputElement>document.getElementById("name")).value = arrayUnit.name;
        (<HTMLInputElement>document.getElementById("session")).value = arrayUnit.session;
        (<HTMLInputElement>document.getElementById("level")).value = arrayUnit.level;
        (<HTMLInputElement>document.getElementById("enrolments")).value = arrayUnit.enrolments;
        disableEdit();
      }
    }
  );
}

//disable input fields
function disableEdit(): void {
  (<HTMLInputElement>document.getElementById("code")).value;
  (<HTMLInputElement>document.getElementById("name")).value;
  (<HTMLInputElement>document.getElementById("session")).value;
  (<HTMLInputElement>document.getElementById("level")).value;
  (<HTMLInputElement>document.getElementById("enrolments")).value;
}

//clear input fields
function clearInput(): void {
  (<HTMLInputElement>document.getElementById("code")).value = null;
  (<HTMLInputElement>document.getElementById("name")).value = null;
  (<HTMLInputElement>document.getElementById("session")).value = null;
  (<HTMLInputElement>document.getElementById("level")).value = null;
  (<HTMLInputElement>document.getElementById("enrolments")).value = null;
}

//Check mandatory data
function checkData(): boolean {
  //checking if unitCode has been entered or not
  if ((<HTMLInputElement>document.getElementById("code")).value != "") {
    if ((<HTMLInputElement>document.getElementById("name")).value != "") {
      return true;
    }
    else {
      document.getElementById('message').innerHTML = "Unit Name is Required";
      return false;
    }
  }
  else {
    document.getElementById('message').innerHTML = "Unit Code is Required";
    return false;
  }
}

//Procedure of deletion
function doDelete() {
  document.getElementById("deleteDialog").style.visibility = "visible";
}

//confirm deletion
function doDeleteYes() {
  let dataSelected = (<HTMLSelectElement>document.getElementById("searchList")).value;//get the value of selected data
  data.forEach(function(arrayUnit) {
    if (dataSelected == arrayUnit.code) {//if there is a unit code equql to the unit code of arrayUnit
      let index = data.indexOf(arrayUnit);//delete the selected data from arrayUnit
      data.splice(index, 1);
      loadData();
      clearInput();
      document.getElementById('message').innerHTML = dataSelected + " confirmed delete.";
      document.getElementById("deleteDialog").style.visibility = "hidden";
    }
    else {
      document.getElementById("deleteDialog").style.visibility = "hidden";
      document.getElementById('message').innerHTML = "Please select a data from search bar.";
    }
  });
}

//Cancel deletion
function doDeleteNo() {
  document.getElementById('message').innerHTML = "Cancel delete.";
  document.getElementById("deleteDialog").style.visibility = "hidden";
}
