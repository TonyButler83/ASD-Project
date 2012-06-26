/*
Miu Project 4
by: Tony Butler
date: 3/22/2012
term: 1203
*/


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


var getPword = fn('pword');
var getCpword = fn('cpword');



function comparePwords(){
	if(getPword.value === getCpword.value){
		
	}else{
		alert("The passwords do not match. Please try again.");
	}
}


var clearLink = fn('clear');
clearLink.addEventListener("click", clearLocal);


});