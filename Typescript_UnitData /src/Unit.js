/*
Assignment Part 1
Name:Shu-Wei, Yeh
Student ID: 22862541
Campus: SCU Melbourne
*/
;
//Declare an array of Unit
var data = [
    { code: "CSC73010", name: "Programming Mobile Systems" },
    { code: "CMP73001", name: "Cybersecurity Management", session: "session1", level: "introductory", enrolments: "200" }
];
//Showing the message
function message(msg) {
    document.getElementById("message").innerHTML = msg;
}
//Initializing index as an number that is -1
var index = -1;
//Showing the current index and total records
function updateDisplay() {
    document.getElementById("currentIndex").innerHTML = "" + (index + 1);
    document.getElementById("totalRecords").innerHTML = "" + data.length;
}
//Add data
function doAdd() {
    var uCode = document.getElementById("code").value;
    var uName = document.getElementById("name").value;
    var uSession = document.getElementById("session").value;
    var uLevel = document.getElementById("level").value;
    var uEnrolments = document.getElementById("enrolments").value;
    if (checkData()) {
        index = data.length; //add a data at the end of array
        data[index] = { code: uCode, name: uName, session: uSession, level: uLevel, enrolments: uEnrolments };
        loadData();
        updateDisplay();
        document.getElementById('message').innerHTML = uCode + " has been saved.";
    }
    updateDisplay();
}
//Edit data
function doEdit() {
    var uCode = document.getElementById("code").value;
    var uName = document.getElementById("name").value;
    var uSession = document.getElementById("session").value;
    var uLevel = document.getElementById("level").value;
    var uEnrolments = document.getElementById("enrolments").value;
    var thisData = {
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
function loadData() {
    clearList(); //clear list
    data.forEach(function (arrayUnit) {
        var writer = arrayUnit.code;
        var listData = document.getElementById("searchList").innerHTML;
        document.getElementById("searchList").innerHTML = listData + "<option>" + writer + "</option>";
    });
}
//clearing the list excluding the default value
function clearList() {
    var selectList = document.getElementById("searchList");
    selectList.length = 1;
}
//next data
function doNext() {
    message("");
    if (index == (data.length - 1)) {
        message("Woops~ this is the last of data.");
        return;
    }
    index++;
    document.getElementById("code").value = data[index].code;
    document.getElementById("name").value = data[index].name;
    document.getElementById("session").value = data[index].session;
    document.getElementById("level").value = data[index].level;
    document.getElementById("enrolments").value = data[index].enrolments;
    updateDisplay();
}
//Previous data
function doPrev() {
    message("");
    if (index <= 0) { // at start or array is empty
        message("Already at the first of data.");
        return;
    }
    index--;
    document.getElementById("code").value = data[index].code;
    document.getElementById("name").value = data[index].name;
    document.getElementById("session").value = data[index].session;
    document.getElementById("level").value = data[index].level;
    document.getElementById("enrolments").value = data[index].enrolments;
    updateDisplay();
}
//function that will load details into corresponding input field when data is selected from select list
function unitDetails(value) {
    data.forEach(function (arrayUnit) {
        if (value == arrayUnit.code) {
            document.getElementById("code").value = arrayUnit.code;
            document.getElementById("name").value = arrayUnit.name;
            document.getElementById("session").value = arrayUnit.session;
            document.getElementById("level").value = arrayUnit.level;
            document.getElementById("enrolments").value = arrayUnit.enrolments;
            disableEdit();
        }
    });
}
//disable input fields
function disableEdit() {
    document.getElementById("code").value;
    document.getElementById("name").value;
    document.getElementById("session").value;
    document.getElementById("level").value;
    document.getElementById("enrolments").value;
}
//clear input fields
function clearInput() {
    document.getElementById("code").value = null;
    document.getElementById("name").value = null;
    document.getElementById("session").value = null;
    document.getElementById("level").value = null;
    document.getElementById("enrolments").value = null;
}
//Check mandatory data
function checkData() {
    //checking if unitCode has been entered or not
    if (document.getElementById("code").value != "") {
        if (document.getElementById("name").value != "") {
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
    var dataSelected = document.getElementById("searchList").value; //get the value of selected data
    data.forEach(function (arrayUnit) {
        if (dataSelected == arrayUnit.code) { //if there is a unit code equql to the unit code of arrayUnit
            var index_1 = data.indexOf(arrayUnit); //delete the selected data from arrayUnit
            data.splice(index_1, 1);
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
