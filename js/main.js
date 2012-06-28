/*
Miu Project 4
by: Tony Butler
date: 3/22/2012
term: 1203
*/
/*
var parseEForm = function(data){
	console.log(data)
};

$(document).ready(function(){


   var eform =$('#entryform');
   
   eform.validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			var data = eform.serializeArray();
			parseEForm(data);
			localStorage.setItem("formdata", data);
{
        alert( "Your entry has been saved!" );
    }
}

	});
});

window.addEventListener("DOMContentLoaded", function(){

function fn(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

function clearLocal(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All password entries have been deleted!");
		window.location.reload();
		return false;
	}
}

var clearLink = fn('clear');
clearLink.addEventListener("click", clearLocal);

});
*/


$(document).on("mobileinit", function(){
    $.mobile.ajaxLinksEnabled=false;
});

// STORE FUNCTION
$('#submit').on('click', function storeData(key) {

    if(validateForm()) {

        if(!key) {
            var id = Math.floor(Math.random()*10000001);
        }else{
            var id = key;
        }

        // Gather up all form values and labels.
        //Find the value of the selected radio button.
        var item	    = {};
        item.group		= ["Category:", $('#groups').val()];
        item.title		= ["Title:", $('#title').val()];
        item.login		= ["Login:", $('#login').val()];
        item.pword		= ["Password:", $('#pword').val()];
        item.cpword		= ["Confirm Password:", $('#cpword').val()];
        item.sort		= ["Sort By:", $('#sort').val()];
        item.usage		= ["Usage:", $('#usage2').val()];
        item.date		= ["Date Modified:", $('#dateModified').val()];
        item.notes		= ["Notes:", $('#notes').val()];

        //Save data into local storage
        localStorage.setItem(id, JSON.stringify(newItem));
        alert("Your entry has been saved!");

    }
});


// VALIDATE FUNCTION
var validateForm = function (entryId) {
    var getGroup = $("#groups").val();
    var getTitle = $("#title").val();
    var getPword = $("#pword").val();
    var getCpword = $("#cpword").val();
    var formErrors = $('#formErrors');

    //Reset error messages
    $(".error").hide();
    var hasError = false;
    $('#errors').empty();
    $('#groups > div').css("border", "none") ;
    $('#title').css("border", "none") ;
    $('#pword').css("border", "none") ;
    $('#cpword').css("border", "none") ;


    //Get Error messages
    var messageArray = [];
    //Select Category validation
    if (getGroup === "--Select A Category--") {
        $('#groups').after('<span class="error">Please select a category.</span>');
        $('#groups').css("border", "1px solid red") ;
        hasError = true;
    }
    //Title validation
    if (getTitle === "") {
        $('#title').after('<span class="error">Please enter a title.</span>');
        $('#title').css("border", "1px solid red") ;
        hasError = true;
    }
    //Password validation
    if (getPword === "") {
        $('#pword').after('<span class="error">Please enter a password.</span>');
        $('#pword').css("border", "1px solid red") ;
        hasError = true;
    }

    //Confirm password validation
    if (getCpword === "") {
        $('#cpword').after('<span class="error">Please enter a password.</span>');
        $('#cpword').css("border", "1px solid red") ;
        hasError = true;
    }

    //Set Errors
    if (hasError === true) {
        $('#submit-container').after('<span class="error">Please correct the errors above.</span>');
        event.preventDefault();
        return false;
    } else {
        //If all is validated, save the data and send the key value from editData
        storeData(entryId);
    }
}


//  Set default date
function setDate() {
    if (!($('#myDate').val()) ) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;//January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {dd='0'+dd;}
        if(mm<10) {mm='0'+mm;}
        $('#myDate').val(mm+'/'+dd+'/'+yyyy);
    }
}

    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this entry?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Entry is deleted!");
            window.location.reload();
        }else{
            alert("Entry was NOT deleted.")
        }
    }

    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.")
        }else{
            localStorage.clear();
            alert("All password entries have been deleted!");
            window.location.reload();
            return false;
        }
    }

    function validate(e){
        var getGroup = $('groups');
        var getTitle = $('title');
        var getPword = $('pword');
        var getCpword = $('cpword');


//Reset Error Messages
        errMsg.innerHTML = "";
        getGroup.style.border = "1px solid black";
        getTitle.style.border = "1px solid black";
        getPword.style.border = "1px solid black";
        getCpword.style.border = "1px solid black";

        var messageAry = [];
//Category validation
        if(getGroup.value ==="--Select Category--"){
            var groupError = "Please select a category.";
            getGroup.style.border = "1px solid red";
            messageAry.push(groupError);
        }
//Title validation
        if(getTitle.value === ""){
            var titleError = "Please enter a title."
            getTitle.style.border = "1px solid red";
            messageAry.push(titleError);
        }
//Password validation
        if(getPword.value === ""){
            var pwordError = "Please enter a password."
            getPword.style.border = "1px solid red";
            messageAry.push(pwordError);
        }
//Confirm Password validation
        if(getCpword.value === ""){
            var cpwordError = "Please retype your password for confirmation."
            getCpword.style.border = "1px solid red";
            messageAry.push(cpwordError);

        }

////Displays messages on screen
        if(messageAry.length >= 1){
            for(var i=0, j=messageAry.length; i < j; i++){
                var txt = document.createElement('li');
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        }else{

            storeData(this.key);
        }
    }


    var entryGroups = ["--Select Category--", "Computer_Logins", "Email", "Financial", "Online_Shopping", "Personal", "Other"],
        sortValue,
        errMsg = $('errors');
    ;

    var displayLink = $('displayLink');
    displayLink.addEventListener("click", getData);
    var clearLink = $('clear');
    clearLink.addEventListener("click", clearLocal);
    var save = $('submit');
    save.addEventListener("click", validate);
    getPword.addEventListener("blur", checkPword);
    check.addEventListener("click", comparePwords);


});

