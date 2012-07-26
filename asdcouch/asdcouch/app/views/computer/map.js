
function (doc) {
	if (doc.group === "Computer_Login"){
		emit(doc.group,{
			"id": doc._id,
	    	"group": doc.group,
	    	"title": doc.title,
	    	"login": doc.login,
	    	"pword": doc.pword,
	    	"sort": doc.sort,
	    	"usage": doc.usage,
	    	"date": doc.date,
	    	"notes": doc.notes
		});
	}	
};