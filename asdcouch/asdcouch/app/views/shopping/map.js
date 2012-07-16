function (doc) {
	if (doc.group === "Online_Shopping"){
		emit(doc.group,{
			"category": doc.group,
			"title": doc.title,
			"login": doc.login,
			"password" : doc.pword,
			"notes": doc.notes
		});
	}	
};