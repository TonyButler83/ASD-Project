function (doc) {
	if (doc.group[1].substr(0,1) === "E"){
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