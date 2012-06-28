/*
ASD Project 1
by: Tony Butler
date: 6/28/2012
term: 1207
*/


$(document).on("mobileinit", function(){
    $.mobile.ajaxLinksEnabled=false;
});



// STORE DATA FUNCTION
var parseEForm = function(data){
    console.log(data)
};
var eform =$('#entryForm');

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
$('#submit').on('click', function storeData(key) {
//function storeData(){
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
        localStorage.setItem(id, JSON.stringify(item));
    }
});


// VALIDATE FUNCTION
var validateForm = function (entryId) {
    var getGroup = $("#select").val();
    var getTitle = $("#title").val();
    var getPword = $("#pword").val();
    var getCpword = $("#cpword").val();
    var formErrors = $('#formErrors');

    //Reset error messages
    $(".error").hide();
    var hasError = false;
    $('#errors').empty();
    $('#select > div').css("border", "none") ;
    $('#title').css("border", "none") ;
    $('#pword').css("border", "none") ;
    $('#cpword').css("border", "none") ;


    //Get Error messages
    var messageArray = [];
    //Select Category validation
    if (getGroup === "Select A Category") {
        $('#select > div').after('<span class="error">Please select a category.</span>');
        var groupsError = "Please select a category";
        $('#select > div').css("border", "1px solid red") ;
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
        $('#cpword').after('<span class="error">Please confirm your password.</span>');
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

$('#entryForm').submit(function () {
    validateForm(entryId);
});


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
};

 var input = $("input:reset")


// CLEAR ALL FUNCTION
$("#clear").on('click', function () {
    if (localStorage.length === 0) {
        alert("There is no data to clear.");
    } else {
        var ask = confirm("Are you sure you want to delete all entries?");
        if (ask) {
            localStorage.clear();
            alert("All entries have been deleted.");
            window.location.href = "index.html";
            return false;
        } else {
            alert("All entries were NOT deleted.");
        }
    }
});

