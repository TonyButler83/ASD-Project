/*
 Tony Butler
 ASD Project 2
 1207
 */
/*
$('#home').live('pageinit', function () {
    $('#displayLink1').on("click", function () {
        $.ajax({
            url:'xhr/main.json',
            type:'GET',
            dataType:'json',
            success:function (response) {
                for (var i = 0, len = response.entries.length; i < len; i++) {
                    var item = response.entries[i];
                    console.log(item);
                    $('#displayLink1').after('' +
                        '<li class="ui-li ui-li-static ui body-a">' +
                        '<h3>' + item.title[1] + '</h3>' +
                        '<p>' + item.group[1] + '</p>' +
                        '&nbsp;&nbsp;' + '<p>' + 'login: ' + item.login[1] + '</p>' +
                        '&nbsp;&nbsp;' + '<p>' + 'password: ' + item.pword[1] + '</p>' +
                        '</li>');
                }
            }
        });
        $('#removeList').remove();
        //$('#dataList').listview('refresh');
    });

    $('#displayLink2').on("click", function () {
        $.ajax({
            url:"xhr/main.xml",
            type:'GET',
            dataType:"xml",
            success:function (xml) {
                console.log(xml)
                $(xml).find("item").each(function () {
                    var xmlList = {};
                    xmlList.title = $(this).find("title").text();
                    xmlList.category = $(this).find("category").text();
                    xmlList.login = $(this).find("login").text();
                    xmlList.password = $(this).find("password").text();
                    console.log(xmlList);

                    $('#displayLink2').after('' +
                        '<li class="ui-li ui-li-static ui body-a">' +
                        '<h3>' + xmlList.title + '</h3>' +
                        '<p>' + xmlList.category + '</p>' +
                        '&nbsp;&nbsp;' + '<p>' + 'login: ' + xmlList.login + '</p>' +
                        '&nbsp;&nbsp;' + '<p>' + 'password: ' + xmlList.password + '</p>' +
                        '</li>');
                });
            }
        })
    })

    $('#displayLink3').on("click", function(){
        $.ajax({
            url: 'xhr/main.csv',
            type: 'GET',
            dataType: 'text',
            success: function(csv){
                console.log(csv);
                var items = csv.split("\n");
                for(var j=1; j< items.length; j++){
                    var row = items[j];
                    var columns = row.split(",");

                    console.log(columns);
                    $('#displayLink3').after(''+
                        '<li class="ui-li ui-li-static ui body-a">' +
                        '<h3>'+ columns[1] +'</h3>' +
                        '<p>' + columns[0] +  '</p>' +
                        '&nbsp;&nbsp;' + '<p>' + 'Login:'  + columns[2] + '</p>' +
                        '&nbsp;&nbsp;' + '<p>' + 'Password:'  + columns[3] + '</p>' +
                        '</li>');
                }
            }
        });
    });
});

*/
