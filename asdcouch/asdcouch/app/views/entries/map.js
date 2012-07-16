function(doc){
	if (doc._id.substr(0,6) === "title:") {
		emit(doc._id, {
			"category": doc.group,
			"title": doc.title,
			"login": doc.login,
			"password" : doc.pword,
			"notes": doc.notes			
		});	
	}
};