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




    function getSelectedRadio(){
        var radios = document.forms[0].sort;
        for(var i=0; i<radios.length; i++){
            if(radios[i].checked){
                sortValue = radios[i].value;
            }
        }
    }

    function storeData(key){
        if(!key){
            var id				= Math.floor(Math.random()*1000000001);
        }else{
            id = key;
        }

        getSelectedRadio();

        var item			= {};
        item.group		= ["Category:", $('groups').value];
        item.title		= ["Title:", $('title').value];
        item.login		= ["Login:", $('login').value];
        item.pword		= ["Password:", $('pword').value];
        item.cpword		= ["Confirm Password:", $('cpword').value];
        item.sort		= ["Sort By:", sortValue];
        item.usage		= ["Usage:", $('usage2').value];
        item.date		= ["Date Modified:", $('dateModified').value];
        item.notes		= ["Notes:", $('notes').value];

        localStorage.setItem(id, JSON.stringify(item));
        alert("Entry Saved!");
    }



//Auto Fill Local Storage from Json file.
    function autoFillData(){
        for(var n in json){
            var id = Math.floor(Math.random()*1000000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }

    function makeItemLinks(key, linksLi){
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Entry";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);

        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Entry";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }

    function editItem(){
        //Grab the data from our item from Local Storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        //Show the form
        toggleControls("off");

//Populate the form fields with current localStorage values.
        $('groups').value = item.group[1];
        $('title').value = item.title[1];
        $('login').value = item.login[1];
        $('pword').value = item.pword[1];
        $('cpword').value = item.cpword[1];
        var radios = document.forms[0].sort;
        for(var i=0; i<radios.length; i++){
            if(radios[i].value == "Category" && item.sort[1] == "Category"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Title" && item.sort[1] == "Title"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Usage" && item.sort[1] == "Usage"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Date Added" && item.sort[1] == "Date Added"){
                radios[i].setAttribute("checked", "checked");
            }
        }
        $('usage2').value = item.usage[1];
        $('dateModified').value = item.date[1];
        $('notes').value = item.notes[1];

        save.removeEventListener("click", storeData);
        $('submit').value = "Edit Entry";
        var editSubmit = $('submit');
//Save the key value establised in this function as a property of the editSubmit event
//so we can use that value when we save the data we edited.
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
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