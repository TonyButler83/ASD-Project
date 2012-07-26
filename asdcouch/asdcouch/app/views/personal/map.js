function (doc) {
	if (doc.group[1].substr(0,1) === "P"){
		emit(doc.group,{
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