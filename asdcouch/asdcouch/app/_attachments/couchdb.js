
	
$('#home').live("pageshow", function(){	
	$.couch.db("asdproject").view("app/computer",{
			success: function(data){
				//console.log(data);
				$('#cpulist').empty();
				$.each(data.rows, function(index, cpu){
					var category = cpu.value.group;
					var title    = cpu.value.title;
					var login    = cpu.value.login;
					var pword    = cpu.value.pword;
					$('#cpulist').append(
						$('<li>').append(
							$('<a>').attr("href", "#")
								.text(title)		
						)					
					);				
				});  
				//$('#cpulist').listview('refresh');
			}
		});


});

$('#cpulogins').live("pageshow", function(){	
	 console.log("javascript works!");
	$.ajax({
		"url": "_view/computer",
		"dataType": "json",
		"success": function(data) {
			$('#cpulist').empty();
			$.each(data.rows, function(index, cpu){
				var category = cpu.value.group;
				var title    = cpu.value.title;
				var login    = cpu.value.login;
				var pword    = cpu.value.pword;
				$('#cpulist').append(
					$('<li>').append(
						$('<a>').attr("href", "#")
							.text(title)
							
					)					
				);				
			});  
			$('#cpulist').listview('refresh');
		}
	});
});


$('#email').live("pageshow", function(){	
$.ajax({
	"url": "_view/email",
	"dataType": "json",
	"success": function(data) {
		$('#emailList').empty();
		$.each(data.rows, function(index, emails){
			var category = emails.value.group;
			var title    = emails.value.title;
			var login    = emails.value.login;
			var pword    = emails.value.pword;
			$('#emailList').append(
				$('<li>').append(
					$('<a>').attr("href", "#")
						.text(title)
				)					
			);				
		});
       
		$('#emailList').listview('refresh');
	}
});
});

$('#financial').live("pageshow", function(){	
$.ajax({
	"url": "_view/financial",
	"dataType": "json",
	"success": function(data) {
		$('#financialList').empty();
		$.each(data.rows, function(index, finances){
			var category = finances.value.group;
			var title    = finances.value.title;
			var login    = finances.value.login;
			var pword    = finances.value.pword;
			$('#financialList').append(
				$('<li>').append(
					$('<a>').attr("href", "#")
						.text(title)
				)					
			);				
		});  
		$('#financialList').listview('refresh');
	}
});
});

$('#onlineshopping').live("pageshow", function(){	
$.ajax({
	"url": "_view/shopping",
	"dataType": "json",
	"success": function(data) {
		$('#shoppinglist').empty();
		$.each(data.rows, function(index, buy){
			var category = buy.value.group;
			var title    = buy.value.title;
			var login    = buy.value.login;
			var pword    = buy.value.pword;
			$('#shoppinglist').append(
				$('<li>').append(
					$('<a>').attr("href", "#")
						.text(title)
				)					
			);				
		});  
		$('#shoppinglist').listview('refresh');
	}
});
});

$('#personal').live("pageshow", function(){	
$.ajax({
	"url": "_view/personal",
	"dataType": "json",
	"success": function(data) {
		$('#personalList').empty();
		$.each(data.rows, function(index, personal){
			var category = personal.value.group;
			var title    = personal.value.title;
			var login    = personal.value.login;
			var pword    = personal.value.pword;
			$('#personalList').append(
				$('<li>').append(
					$('<a>').attr("href", "#")
						.text(title)
				)					
			);				
		});  
		$('#personalList').listview('refresh');
	}
});
});

$('#other').live("pageshow", function(){	
$.ajax({
	"url": "_view/other",
	"dataType": "json",
	"success": function(data) {
		$('#otherlist').empty();
		$.each(data.rows, function(index, other){
			var category = other.value.group;
			var title    = other.value.title;
			var login    = other.value.login;
			var pword    = other.value.pword;
			$('#otherlist').append(
				$('<li>').append(
					$('<a>').attr("href", "#")
						.text(title)
				)					
			);				
		});
		$('#otherlist').listview('refresh');
	}
});
});   



