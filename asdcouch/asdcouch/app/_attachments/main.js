/*
ASD Project
by: Tony Butler
date: 7/25/2012
term: 1207
*/

/*
$(document).on("mobileinit", function(){
    $.mobile.ajaxLinksEnabled=false;
});
*/


$('#home').live('pageshow', function(){
     $.couch.db("asdproject").view("app/categories", {
          success:function (data) {
             console.log(data);
             $('#categoryList').empty();
             var header = $('<li class="ui-li ui-li-divider ui-bar-f ui-corner-top" data-theme="b" data-role="list-divider" role="heading">Categories:</li>').appendTo('#categoryList');
              $.each(data.rows, function (index, category) {
                  var title = category.value.title;
                  var description = category.value.description;
                  $('#categoryList').append(
                      $('<li>').append(
                       $('<a>').attr("href", "#entries?entries=" + title)
                        .attr("data-transition", "slide").attr('rel', 'external')
                        .append(
                        $('<h3>').text(title),
                        $('<p>').text(description)
                      )
                    )
                  );
               });
            $('#categoryList').listview('refresh');
          }
        });
    });

// Get value from URL
function getUrlVars(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m,key,value) {
        vars[key] = value;
    });
}

$('#entries').live('pagehide', function (event) {
        $('#entries #header #title').remove();
        $('#entryList').empty();
        var category = '';
        var catUrl = '';
    });

$('#entries').live('pageshow', function (event) {
    var category = getUrlVars()["cat"];
    var catUrl = "entries/" + category.toLowerCase();
    $('<h1></h1>').addClass('ui-title').attr('data-theme', 'b')
        .attr('role', 'heading').attr('id', 'title')
        .attr('aria-level', 1).text(category.substr(0,1).toUpperCase() + category.substr(1)).prependTo('#entries #header').trigger('create');

    $db.view(catUrl, {
        "success":function (data) {
            $.each(data.rows, function (index, entry) {
                var id = entry.id.substr(9, entry.id.length);
                var category = entry.value.group[1];
                var title = entry.value.title[1];
                var login = entry.value.login[1];
                var pword = entry.value.pword[1];
                var notes = entry.value.notes[1];
                $('#entries #entryList').append(
                    $('<li>').append(
                        $('<a>').attr("href", "#viewEntry?id=" + id).attr('rel', 'external').attr("data-transition", "slide").append(
                            $('<h5>').addClass(id).attr("data-transition", "slide").text(title),
                            $('<p>').addClass('subhead ' + id).html('<strong>Login:</strong> ' + login),
                            $('<p>').addClass('ui-li-desc ' + id).text(pword)
                        )
                    )
                );
            });

            $('#viewEntry').live('pageshow', function (event) {
                $('#viewEntry #content .content-container').remove();
            });
            $('#viewEntry').live('pageshow', function (event) {
                var entryId = getUrlVars()["id"]
                var entryUrl = '/asdproject/_all_docs?include_docs=true&key="entry:' + entryId + '"';
                $('<div></div>').addClass('content-container ui-btn  ui-li ui-corner-top ui-corner-bottom ui-btn-up-c ' + entryId).prependTo('#viewEntry #content');

                $.ajax({
                    "url":entryUrl,
                    "dataType":"json",
                    "success":function (data) {
                        $.each(data.rows, function (index, entry) {
                            var category = entry.value.group[1];
                            var title = entry.doc.title[1];
                            var login = entry.doc.login[1];
                            var pword = entry.doc.pword[1];
                            var usage = entry.doc.usage[1];
                            var date  = entry.doc.date[1];
                            var sort  = entry.doc.sort[1];
                            var notes = entry.doc.notes[1];
                            var id = entry.doc._id;
                            var rev = entry.doc._rev;
                            var entryString = $('<div data-role="collapsible" data-theme="b">' +
                                '<h3>' + title + '</h3>' +
                                '<p><strong>Category:</strong> ' + category + '</p>' +
                                '<p><strong>Login:</strong> ' + login + '</p>' +
                                '<p><strong>Password:</strong> ' + pword + '</p>' +
                                '<p><strong>Usage:</strong> ' + usage + '</p>' +
                                '<p><strong>Date:</strong> ' +  date +  '</p>' +
                                '<p><strong>Sort:</strong> ' +  sort +  '</p>' +
                                '<p><strong>Notes:</strong> ' + notes+  '</p>' +
                                '</div>').appendTo('#viewEntry #content .content-container');

                            $('#viewEntry #edit').attr('href', 'additem.html?entryId=' + entryId + '&op=edit');
                            $('#viewEntry #delete').attr('rel', sort);

                        });
                    },
                    "error":function (result) {
                        console.log(result);
                    }

                });
            });

        }
    })
});


$('#addItem').live('pageshow', function (event) {
    var op = getUrlVars()["op"];
    var entryId = getUrlVars()["entryId"];
    if(op === 'edit') {
        $('input[name="sort"]').removeAttr('checked');
        //Change submit button value to edit button
        $('#submit').addClass('edit-button').text('Edit Entry');
        $('input[value="Category"]').removeAttr('checked').checkboxradio('refresh');
        editEntry(entryId);
    }
  
    $('#submit').on('click', validateForm);

//});

//Edit function

 function editEntry(entryId){
    var entryUrl = '/asdproject/_all_docs?include_docs=true&key=entries'+entryId+'"';
     $.ajax({
         "url": entryUrl,
         "dataType": "json",
         "success": function(data){
             var rev = data.rows[0].doc._rev;
             $.each(data.rows, function(index, entry){
                  $('#groups').val(entry.doc.group[1]);
                  $('#title').val(entry.doc.title[1]);
                  $('#login').val(entry.doc.login[1]);
                  $('#pword').val(entry.doc.pword[1]);
                  $('#cpword').val(entry.doc.cpword[1]);
                  $('#usage').val(entry.doc.usage[1]);
                  $('#myDate').val(entry.doc.date[1]);
                  $('#sort').val(entry.doc.sort[1]);
                  $('#notes').val(entry.doc.notes[1]);
                  $('#entry-id').val(entry.doc._id);
                  $('#entry-rev').val(entry.doc._rev);
               });
            },
           "error": function(result){
               console.log(result);

         }
     });

}
 /*
// STORE DATA FUNCTION
/*var parseEForm = function(data){
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
            alert( "Your Entry has been saved!" );
        }
    }
});
 */


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
    $('#select > div').css("border", "none") ;
    $('#title').css("border", "none") ;
    $('#pword').css("border", "none") ;
    $('#cpword').css("border", "none") ;


    //Get Error messages
    var messageArray = [];
    //Select Category validation
    if (getGroup === "Select A Category") {
        $('#groups').after('<span class="error">Please select a category.</span>');
        var groupsError = "Please select a category";
        $('#groups').css("border", "1px solid red") ;
        groupsError = true;
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

    //Confirm password match
    if(getCpword!= getPword) {
        $("#cpword").after('<span class="error">The passwords do not match.</span>');
        $('#cpword').css("border", "1px solid red") ;
        hasError = true;
        //return false;
    }


    //Set Errors
    if (hasError === true) {
        $('#submit-container').after('<span class="error">Please correct the errors above.</span>');
        //event.preventDefault();
        return false;
    } else {
        //If all is validated, save the data and send the key value from editData
        storeData();

    }
}

// Store Function

function storeData() {

    if($('#entry-id').val().length > 0) {
        var entryIdSet = $('#entry-id').val();
    }else{
        var entryIdSet = 'entry:'+('#title').val()..toLowerCase().replace( /\s/g, "").split(',').join('').replace(/[^a-zA-Z 0-9]+/g,'');

    }

    // Gather up all form values and labels.
    //Find the value of the selected radio button.
    var newEntry = {};
    newEntry._id = entryIdSet;
    newEntry.title = ["Title:", $('#title').val()];
    newEntry.login = ["Login:", $('#login').val()];
    newEntry.pword = ["Password:", $('#pword').val()];
  //newEntry.cpword = ["Confirm Password:", $('#cpword').val()];
    newEntry.usage = ["Usage:", $('#usage').val()];
    newEntry.date = ["Date Last Modified:", $('#myDate').val()];
    newEntry.sort = ["Sort By:", getRadio];
    newEntry.notes = ["Notes:", $('#notes').val()];

    // Get revision info of existing entry to edit
    if( $('#entry-rev').val().length > 0 ) {
        var revText = {_rev:$('#entry-rev').val()};
        $.extend(newEntry, revText) ;
    }

    //Save data into Couch DB
    $db.saveDoc(newEntry,{
        success: function(data) {
            //console.log(data);
        },
        error: function(status) {
            console.log(status);
        }
    });
    alert("Your entry has been saved!");
    document.location.href='#entries?cat='+getRadio().toLowerCase();
};

//Delete Function
$("#delete").on('click', function() {
   var entryId = 'entry:'+getUrlVars()["id"];
   var page = ("#" + $(this).attr('rel')).toLowerCase();

   areYouSure("Are you sure?", "This action cannot be undone.", "Yes, Delete this Entry", function(){
        $db.openDoc(entryId, {
           success: function(document){
               console.log(document);
               $db.removeDoc(document, {
                   success: function(){
                      alert("Your entry was successfully deleted.");
                      history.back();
                   },
                  error: function(status) {
                      //console.log(status);
                      alert("Could not remove entry with id: "+ entryId);
                  }
                   });

            },
            error: function(status) {
               console.log(status);
               alert("Could not remove entry with id: "+ entryId);

            }
       });

    });
});

// Get Radio value for store function
var getRadio = function (){
    return($('input:radio[name=sort]:checked').val());
}
 var setRadio = function (myRadio) {
     switch(myRadio)
     {
         case "Category":
             $('input:radio[name=sort]:nth(0)').attr('checked', true);
             $('input:radio[name=sort]').checkboxradio('refresh');
             break;
         case "Title":
             $('input:radio[name=sort]:nth(1)').attr('checked', true);
             $('input:radio[name=sort]').checkboxradio('refresh');
             break;
         case "Usage":
             $('input:radio[name=sort]:nth(2)').attr('checked', true);
             $('input:radio[name=sort]').checkboxradio('refresh');
             break;
         case "Date Added":
             $('input:radio[name=sort]:nth(3)').attr('checked', true);
             $('input:radio[name=sort]').checkboxradio('refresh');
             break;
     }
 }


 /*
$('#submit').on('click', function storeData(key) {
//function storeData(){
    if(validateForm()) {

        if(!key) {
            var id = Math.floor(Math.random()*10000001);
        }else{
            id = key;
        }

        // Gather up all form values and labels.
        //Find the value of the selected radio button.
        var newItem	    = {};
        newItem.group		= ["Category:", $('#groups').val()];
        newItem.title		= ["Title:", $('#title').val()];
        newItem.login		= ["Login:", $('#login').val()];
        newItem.pword		= ["Password:", $('#pword').val()];
        newItem.cpword		= ["Confirm Password:", $('#cpword').val()];
        newItem.sort		= ["Sort By:", $('#sort').val()];
        newItem.usage		= ["Usage:", $('#usage2').val()];
        newItem.date		= ["Date Modified:", $('#dateModified').val()];
        newItem.notes		= ["Notes:", $('#notes').val()];

        //Save data into local storage
        localStorage.setItem(id, JSON.stringify(newitem));
        alert("Your entry has been saved!");
    }
});
$('#entryForm').submit(function () {
    //validateForm(entryId);
});
 */

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
});

