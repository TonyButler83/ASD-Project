/*
 Tony Butler
 ASD Project 2
 1207
 */
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

        $('#dataList').listview('refresh');
    });
});

